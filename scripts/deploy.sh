#!/bin/bash
# deploy.sh — Full deploy script for Luxury Dental Lugano on VPS Hostinger
# Usage: ./scripts/deploy.sh [--no-build] [--seed]
# Run from project root as the app user (not root)

set -euo pipefail

# ── Config ───────────────────────────────────────────────────────────────────
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
COMPOSE="docker compose"
LOG_FILE="/var/log/luxurydental/deploy.log"
NO_BUILD=false
RUN_SEED=false

for arg in "$@"; do
  case $arg in
    --no-build) NO_BUILD=true ;;
    --seed)     RUN_SEED=true ;;
  esac
done

mkdir -p "$(dirname "$LOG_FILE")"
exec > >(tee -a "$LOG_FILE") 2>&1

echo ""
echo "═══════════════════════════════════════════════"
echo "  Luxury Dental — Deploy $(date '+%Y-%m-%d %H:%M:%S')"
echo "═══════════════════════════════════════════════"

cd "$PROJECT_DIR"

# ── Check .env.production exists ─────────────────────────────────────────────
if [[ ! -f .env.production ]]; then
  echo "❌ .env.production not found. Copy .env.example and fill in production values."
  exit 1
fi

# ── Pull latest code ──────────────────────────────────────────────────────────
echo ""
echo "▶ Pulling latest code from git..."
git pull origin main

# ── Run Prisma migrations against production DB ────────────────────────────────
echo ""
echo "▶ Running Prisma migrations..."
set -a; source .env.production; set +a
npx prisma migrate deploy

# ── Build & restart containers ────────────────────────────────────────────────
echo ""
if [[ "$NO_BUILD" == true ]]; then
  echo "▶ Restarting containers (no rebuild)..."
  $COMPOSE --env-file .env.production up -d
else
  echo "▶ Building and restarting containers..."
  $COMPOSE --env-file .env.production up -d --build
fi

# ── Run seed (only if explicitly requested) ────────────────────────────────────
if [[ "$RUN_SEED" == true ]]; then
  echo ""
  echo "▶ Running database seed..."
  $COMPOSE --env-file .env.production exec app npx prisma db seed
fi

# ── Health check ──────────────────────────────────────────────────────────────
echo ""
echo "▶ Waiting for app to be healthy..."
MAX_WAIT=60
ELAPSED=0
until docker inspect luxurydental_app --format='{{.State.Health.Status}}' 2>/dev/null | grep -q "healthy"; do
  sleep 3
  ELAPSED=$((ELAPSED + 3))
  if [[ $ELAPSED -ge $MAX_WAIT ]]; then
    echo "❌ App did not become healthy within ${MAX_WAIT}s"
    docker logs luxurydental_app --tail 50
    exit 1
  fi
  echo "  waiting... (${ELAPSED}s)"
done

echo ""
echo "✅ Deploy complete! App is healthy."
echo "   Containers:"
docker ps --filter "name=luxurydental" --format "  {{.Names}} → {{.Status}}"
