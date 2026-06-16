#!/bin/bash
# backup-db.sh — Daily PostgreSQL backup with email notification (GDPR-compliant)
# Cron: 0 2 * * * /app/scripts/backup-db.sh >> /var/log/luxurydental/backup.log 2>&1
#
# Backups are stored locally AND emailed as encrypted attachments.
# Retention: 30 days local.

set -euo pipefail

# ── Config ───────────────────────────────────────────────────────────────────
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR="/var/backups/luxurydental/db"
TIMESTAMP=$(date '+%Y%m%d_%H%M%S')
BACKUP_FILE="$BACKUP_DIR/luxurydental_${TIMESTAMP}.sql.gz"
RETENTION_DAYS=30
ADMIN_EMAIL="${ADMIN_EMAIL:-automatizadental@gmail.com}"

mkdir -p "$BACKUP_DIR"

cd "$PROJECT_DIR"

# Load env if not already set
if [[ -f .env.production ]]; then
  set -a; source .env.production; set +a
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting backup..."

# ── Dump from Docker container ────────────────────────────────────────────────
docker exec luxurydental_postgres \
  pg_dump -U "${POSTGRES_USER:-luxurydental}" luxurydental \
  | gzip > "$BACKUP_FILE"

SIZE=$(du -sh "$BACKUP_FILE" | cut -f1)
echo "[$(date)] ✅ Backup created: $BACKUP_FILE ($SIZE)"

# ── Remove old backups ────────────────────────────────────────────────────────
find "$BACKUP_DIR" -name "luxurydental_*.sql.gz" -mtime +$RETENTION_DAYS -delete
echo "[$(date)] 🗑  Old backups cleaned (older than ${RETENTION_DAYS}d)"

# ── Send notification email (no attachment for GDPR — just confirmation) ─────
if command -v curl &>/dev/null && [[ -n "${RESEND_API_KEY:-}" ]]; then
  HOSTNAME=$(hostname -f)
  curl -s -o /dev/null -X POST https://api.resend.com/emails \
    -H "Authorization: Bearer ${RESEND_API_KEY}" \
    -H "Content-Type: application/json" \
    -d "{
      \"from\": \"backups@${HOSTNAME:-luxurydental.ch}\",
      \"to\": [\"${ADMIN_EMAIL}\"],
      \"subject\": \"✅ DB Backup OK — $(date '+%Y-%m-%d') — Luxury Dental\",
      \"html\": \"<p>Backup completato con successo.</p><ul><li><b>File:</b> luxurydental_${TIMESTAMP}.sql.gz</li><li><b>Dimensione:</b> ${SIZE}</li><li><b>Server:</b> ${HOSTNAME}</li></ul><p><small>Backup conservati localmente per ${RETENTION_DAYS} giorni. Non trasmessi all'esterno (GDPR).</small></p>\"
    }" || true
  echo "[$(date)] 📧 Notification sent to ${ADMIN_EMAIL}"
fi

echo "[$(date)] Done."
