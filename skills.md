# Deployment Skills — luxury.dental

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14.2.5 (App Router) |
| i18n | next-intl v3.17 (5 locales: en, es, it, de, fr) |
| Database | PostgreSQL via Prisma v5.17 (custom output: `src/generated/prisma`) |
| CMS | Sanity v3.52 |
| Email | Resend |
| Styling | Tailwind v4, Framer Motion |
| Node | 20 LTS |

---

## Deployment Targets

### Coolify via Nixpacks (primary)

Nixpacks reads `nixpacks.toml`. It does NOT use the `Dockerfile`.

Build flow:
1. `npm ci` — installs deps respecting `.npmrc` (`legacy-peer-deps=true`)
2. `npx prisma generate` — generates Prisma client to `src/generated/prisma`
3. `npm run build` — runs `prisma generate && next build` (generate is a no-op second time)
4. `npm start` — runs `next start -H 0.0.0.0 -p 3000`

The `[variables]` block in `nixpacks.toml` sets a placeholder `DATABASE_URL` for the build phase so `prisma generate` never fails. Coolify overrides it with the real value at runtime.

### Coolify via Dockerfile (alternative)

Multi-stage build: `deps` → `builder` → `runner`, all on `node:20-alpine`.

The builder stage uses a placeholder `DATABASE_URL` (`postgresql://placeholder:...`) — Prisma generate only validates the URL format, not connectivity.

The runner stage copies `.next/standalone/server.js` which is generated because `next.config.mjs` has `output: 'standalone'`.

**Build-time ARGs for Coolify (set under "Build arguments"):**

| ARG | Required |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | YES |
| `NEXT_PUBLIC_SANITY_DATASET` | YES |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Optional — defaults to `2025-05-18` |

---

## Environment Variables

### Required at build time (both Nixpacks and Dockerfile)

| Variable | Notes |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Baked into client bundle — changing requires redeploy |
| `NEXT_PUBLIC_SANITY_DATASET` | Baked into client bundle |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Optional, defaults to `2025-05-18` |
| `NEXT_PUBLIC_GA_ID` | Optional — Google Analytics 4. Disabled if absent |

### Required at runtime

| Variable | Required | Notes |
|---|---|---|
| `DATABASE_URL` | **YES** | Full PostgreSQL connection string (Neon). Real value injected by Coolify at runtime |
| `ADMIN_TOKEN` | **YES** | CRM dashboard protection. Min 32 chars. Generate: `openssl rand -hex 32` |
| `RESEND_API_KEY` | Optional | If absent, no email notifications on new leads |
| `ADMIN_EMAIL` | Optional | Defaults to `info@luxurydental.ch` |
| `OPENAI_API_KEY` | Optional | If absent, chatbot runs in FAQ-only mode |
| `NEXTAUTH_SECRET` | Recommended | Required if NextAuth routes are added |
| `NEXTAUTH_URL` | Recommended | Full canonical URL, e.g. `https://www.luxurydental.ch` |

---

## Node Version Contract

All four must stay in sync:

| File | Setting |
|---|---|
| `.nvmrc` | `20` |
| `nixpacks.toml` | `nixPkgs = ["nodejs_20"]` |
| `Dockerfile` | `FROM node:20-alpine` (all 3 stages) |
| `package.json` | `"engines": { "node": ">=20" }` |

---

## Prisma Notes

- Custom output path: `output = "../src/generated/prisma"` in `prisma/schema.prisma`
- Generated client lands at `src/generated/prisma/` — included in Next.js bundle
- `prisma generate` runs during build — idempotent, safe to run twice
- `prisma migrate deploy` is **not** automatic — run manually against Neon before schema-changing releases:
  ```bash
  DATABASE_URL="<neon-url>" npx prisma migrate deploy
  ```

---

## i18n Invariants

- `next.config.mjs` MUST use `withNextIntl(nextConfig)` as the export — removing the wrapper breaks all locale routing
- `next.config.mjs` MUST stay `.mjs` (ESM format) — do not rename to `.js`
- Locales: `en`, `es`, `it`, `de`, `fr`. Default: `it`
- All routes use `/locale/...` prefix. Visiting `/` redirects to `/it`
- `src/navigation.ts` re-exports `Link`, `usePathname`, `useRouter` — always import from there, not `next/link`

---

## Standalone Output

`next.config.mjs` has `output: 'standalone'`. This causes Next.js to generate `.next/standalone/server.js` which the Dockerfile runner stage depends on. It does not affect Nixpacks deployments (which use `next start` directly).

---

## Common Deployment Failures

| Symptom | Cause | Fix |
|---|---|---|
| `Cannot find module server.js` in Docker | `output: 'standalone'` missing from `next.config.mjs` | Ensure the setting is present (it is now) |
| `ERESOLVE peer dependency conflict` | `.npmrc` missing | Verify `.npmrc` exists with `legacy-peer-deps=true` |
| `PrismaClientInitializationError` at runtime | `DATABASE_URL` not set as runtime env in Coolify | Add `DATABASE_URL` to Coolify service environment |
| All pages return 404 | `withNextIntl` wrapper removed from `next.config.mjs` | Restore the wrapper |
| Images from external hosts blocked | `remotePatterns` too restrictive | The `hostname: '**'` catch-all handles all HTTPS sources |
| Port not accessible | `next start` binding to `127.0.0.1` | Verify start script has `-H 0.0.0.0` |
| `Environment variable not found: DATABASE_URL` during build | `DATABASE_URL` not available at build time | Rely on `[variables]` placeholder in `nixpacks.toml` (already set) |

---

## Production Commands

```bash
npm install          # install deps (uses .npmrc legacy-peer-deps)
npm run build        # prisma generate + next build
npm start            # next start -H 0.0.0.0 -p 3000
```

Health check endpoint: `GET /api/health` — returns `{"status":"ok","checks":{"db":"ok"}}` when DB is reachable.
