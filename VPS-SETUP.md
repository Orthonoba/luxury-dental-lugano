# VPS Hostinger — Setup Guide (Luxury Dental)

## 1. Initial server setup

```bash
# As root on your VPS:
apt update && apt upgrade -y
apt install -y curl git unzip

# Install Docker + Compose
curl -fsSL https://get.docker.com | sh
systemctl enable docker

# Create app user
useradd -m -s /bin/bash appuser
usermod -aG docker appuser

# Create log dir
mkdir -p /var/log/luxurydental /var/backups/luxurydental/db
chown appuser:appuser /var/log/luxurydental /var/backups/luxurydental
```

## 2. Clone the project

```bash
su - appuser
git clone git@github.com:YOUR_ORG/luxury-dental-lugano.git /app
cd /app
cp .env.production.example .env.production
# Edit .env.production with your real values
nano .env.production
```

## 3. Generate secrets

```bash
# JWT secret (128 hex chars)
openssl rand -hex 64

# Document encryption key (64 hex chars = 32 bytes AES-256)
openssl rand -hex 32

# WhatsApp webhook verify token
openssl rand -hex 32
```

## 4. Install Nginx + Certbot

```bash
apt install -y nginx certbot python3-certbot-nginx

# Place the Nginx config
cp /app/nginx/nginx.conf /etc/nginx/sites-available/luxurydental.conf
# Edit YOUR_DOMAIN.com in the config
nano /etc/nginx/sites-available/luxurydental.conf
ln -s /etc/nginx/sites-available/luxurydental.conf /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx

# Get SSL cert
certbot --nginx -d YOUR_DOMAIN.com -d www.YOUR_DOMAIN.com
```

## 5. First deploy

```bash
cd /app
chmod +x scripts/deploy.sh scripts/backup-db.sh

# First deploy with seed
./scripts/deploy.sh --seed
```

## 6. Set up daily DB backup cron

```bash
crontab -e
# Add:
0 2 * * * /app/scripts/backup-db.sh >> /var/log/luxurydental/backup.log 2>&1
```

## 7. WhatsApp Business Cloud API setup

1. Go to https://developers.facebook.com → Create App → Business
2. Add WhatsApp product
3. Get your Phone Number ID and generate a permanent access token
4. Set webhook URL: `https://YOUR_DOMAIN.com/api/webhook/whatsapp`
5. Subscribe to `messages` event
6. Use the verify token from your .env.production

## 8. Update DNS

Point your domain's A record to the VPS IP.

## 9. Verify everything

```bash
# Check containers
docker ps

# Check logs
docker logs luxurydental_app --tail 50
docker logs luxurydental_wa_agent --tail 50

# Test health endpoint
curl https://YOUR_DOMAIN.com/api/health
```

## Architecture overview

```
Internet
  │
  ▼
Nginx (443/SSL) — Let's Encrypt cert
  │
  ├── /api/webhook/whatsapp → whatsapp-agent:3010
  └── /* → app:3005 (Next.js standalone)

Docker Compose services:
  - postgres:5432 (internal network only)
  - app:3005 (Next.js)
  - whatsapp-agent:3010 (AI agent)

Volumes:
  - postgres_data (PostgreSQL data)
  - documents_data (AES-256-GCM encrypted docs)
```
