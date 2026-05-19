# Luxury Dental & Facial Estética

Premium dental clinic website and CRM platform built on Next.js 14. Features multilingual support (5 locales), an AI chatbot, a patient CRM dashboard, Sanity CMS blog, and a white-label architecture for deploying to multiple clinics.

**Live site:** https://www.luxurydental.ch  
**CRM dashboard:** `/crm` (token-protected)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14.2 (App Router, standalone output) |
| Language | TypeScript 5.5 (strict mode) |
| Styling | Tailwind CSS 4.3 (theme in globals.css) |
| Animation | Framer Motion 11 |
| Database | PostgreSQL via Prisma ORM 5.17 |
| CMS | Sanity Studio 3 (blog, embedded at `/studio`) |
| i18n | next-intl 3.17 (en, es, it, de, fr) |
| Email | Resend (lead notifications) |
| AI | OpenAI GPT-4o-mini (chatbot with FAQ fallback) |
| Deployment | Docker (multi-stage) + Coolify + Hetzner Cloud |

---

## Local Development

### 1. Clone and install

```bash
git clone <repo>
cd luxury.dental
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Required for local development:
- `DATABASE_URL` — PostgreSQL connection string
- `ADMIN_TOKEN` — any string ≥ 16 chars (for `/crm` access)

Optional:
- `OPENAI_API_KEY` — enables AI chatbot (FAQ-only mode without it)
- `RESEND_API_KEY` — enables email notifications on new leads
- Sanity vars — needed for blog/CMS features

### 3. Database setup

```bash
# Push schema to your local PostgreSQL (creates tables without migration history)
npx prisma db push

# Recommended for production — applies tracked migrations:
npx prisma migrate deploy
```

### 4. Start dev server

```bash
npm run dev
```

App runs at http://localhost:3000. The Sanity Studio is at http://localhost:3000/studio.

---

## Build & Docker

### Local build

```bash
npm run build     # prisma generate + next build
npm start         # production server
```

### Docker

```bash
docker build \
  --build-arg NEXT_PUBLIC_SANITY_PROJECT_ID=your_id \
  --build-arg NEXT_PUBLIC_SANITY_DATASET=production \
  -t luxury-dental .

docker run -p 3000:3000 \
  -e DATABASE_URL=... \
  -e ADMIN_TOKEN=... \
  luxury-dental
```

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `ADMIN_TOKEN` | Yes | CRM dashboard access token (≥ 16 chars) |
| `RESEND_API_KEY` | Optional | Email notifications for new leads |
| `ADMIN_EMAIL` | Optional | Where lead notifications go (default: info@luxurydental.ch) |
| `OPENAI_API_KEY` | Optional | AI chatbot (FAQ-only mode without it) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Build-time | Sanity CMS project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Build-time | Sanity dataset (usually `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Build-time | Sanity API version (e.g. `2025-05-18`) |

---

## Project Structure

```
src/
├── app/              Next.js App Router (pages + API routes)
│   ├── api/
│   │   ├── chat/     AI chatbot endpoint
│   │   ├── contact/  Contact form (rate-limited, Resend notification)
│   │   ├── crm/      CRM auth
│   │   ├── health/   Docker healthcheck endpoint
│   │   ├── leads/    CRM data retrieval (paginated)
│   │   └── newsletter/ Newsletter subscription
│   ├── crm/          Patient CRM dashboard
│   └── studio/       Sanity Studio (embedded)
├── components/
│   ├── animations/   Framer Motion wrappers
│   ├── floating/     AIChatbot, WhatsAppButton
│   ├── gallery/      BeforeAfterGallery
│   ├── hero/         HeroSection
│   ├── layout/       Navbar, Footer
│   ├── sections/     Page sections
│   └── ui/           Reusable UI components
├── config/
│   ├── clinic.ts     White-label ClinicConfig interface
│   └── site.ts       Active clinic instance config
├── lib/
│   ├── animations.ts Framer Motion variant presets
│   ├── email.ts      Resend email service
│   ├── env.ts        Zod env validation
│   ├── prisma.ts     Prisma client singleton
│   ├── rateLimit.ts  Shared rate limiter factory
│   └── utils.ts      cn() className utility
├── i18n/             next-intl routing + request config
├── sanity/           Sanity client, schema types, structure
└── translations/     i18n JSON files (en, es, it, de, fr)
```

---

## Key Routes

| Route | Description |
|---|---|
| `/` | Redirects to `/en` (default locale) |
| `/en`, `/es`, `/it`, `/de`, `/fr` | Home page (locale-specific) |
| `/en/contact` | Contact form |
| `/en/dental`, `/en/facial-aesthetics` | Service pages |
| `/en/team`, `/en/testimonials` | About pages |
| `/en/before-after` | Gallery |
| `/en/blog` | Blog (Sanity CMS) |
| `/crm` | Admin CRM dashboard (token-protected) |
| `/studio` | Sanity Studio |
| `/api/health` | Health check (returns `{status: "ok"}`) |

---

## Deployment (Coolify)

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full Coolify deployment guide.

Quick version:
1. Push code to Git remote
2. In Coolify: Create new application → Docker → point to your repo
3. Set environment variables (see `.env.example`)
4. Deploy → container passes healthcheck at `/api/health`
5. Run `npx prisma migrate deploy` once after first deploy

---

## White-Label

To deploy a second clinic instance:

1. Fork this repo
2. Update `src/config/site.ts` with the clinic's data (satisfies `ClinicConfig`)
3. Update `src/translations/*.json` with clinic-specific copy
4. Set new env vars (new DB, new Sanity project, new domain)
5. Deploy

See [WHITE_LABEL_GUIDE.md](./WHITE_LABEL_GUIDE.md) for the complete guide.

---

## Documentation

| File | Purpose |
|---|---|
| [CLAUDE.md](./CLAUDE.md) | Architecture reference for AI-assisted development |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Coolify deployment walkthrough |
| [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) | Pre-launch verification checklist |
| [WHITE_LABEL_GUIDE.md](./WHITE_LABEL_GUIDE.md) | Multi-clinic cloning guide |
