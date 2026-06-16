#!/bin/bash
# vps-deploy.sh — Deploy completo en VPS con PM2 (NO Docker)
# Ejecutar como: bash scripts/vps-deploy.sh
# Desde: /var/www/luxury-dental-lugano

set -e

APP_DIR="/var/www/luxury-dental-lugano"
PM2_APP="luxury-dental"
LOG="/var/log/luxurydental-deploy.log"

echo ""
echo "═══════════════════════════════════════════════"
echo "  Luxury Dental — Deploy $(date '+%Y-%m-%d %H:%M')"
echo "═══════════════════════════════════════════════"

cd "$APP_DIR"

# 1. Bajar código
echo "▶ git pull..."
git pull origin main

# 2. Instalar deps (solo las nuevas)
echo "▶ npm install..."
npm install --legacy-peer-deps --silent

# 3. Migrar BD
echo "▶ prisma migrate deploy..."
npx prisma migrate deploy

# 4. Build
echo "▶ npm run build..."
npm run build

# 5. Copiar assets estáticos (CRÍTICO para output:standalone)
echo "▶ Copiando assets estáticos..."
cp -r .next/static .next/standalone/.next/static 2>/dev/null || true
cp -r public .next/standalone/public 2>/dev/null || true

# 6. Reiniciar PM2
echo "▶ pm2 restart..."
pm2 restart "$PM2_APP" --update-env

# 7. Verificar
sleep 3
STATUS=$(curl -s http://localhost:3005/api/health 2>/dev/null || echo '{"status":"error"}')
echo ""
echo "✅ Deploy completado"
echo "   Health: $STATUS"
echo "   PM2:"
pm2 list --no-color | grep "$PM2_APP"
echo ""
echo "🌐 Portal:  https://luxurydental-lugano.ch/it/portal/login"
echo "📊 CRM:     https://luxurydental-lugano.ch/crm"
