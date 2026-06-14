<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:deployment-rules -->
## Deployment Rules

### Files you must not modify without understanding the consequences

- `next.config.mjs` — removing `withNextIntl` wrapper or renaming to `.js` breaks all i18n across 5 locales
- `next.config.mjs` — removing `output: 'standalone'` breaks the Dockerfile runner stage (server.js missing)
- `prisma/schema.prisma` — do not change the `output` path (`../src/generated/prisma`)
- `.npmrc` — do not remove; `npm ci` fails with ERESOLVE peer dep conflicts without `legacy-peer-deps=true`
- `nixpacks.toml` — `[variables] DATABASE_URL` placeholder is intentional; keeps build phase independent from runtime secrets

### Node version contract — 4 places must stay in sync

1. `.nvmrc` — `20`
2. `nixpacks.toml` — `nixPkgs = ["nodejs_20"]`
3. `Dockerfile` — `FROM node:20-alpine` (deps, builder, runner stages)
4. `package.json` — `"engines": { "node": ">=20" }`

### Environment variables

`NEXT_PUBLIC_*` variables are baked into the JS bundle at build time. Changing them requires a full rebuild and redeploy — setting them only as runtime env vars in Coolify is not enough. All other env vars are runtime only (set in Coolify service environment).

### Prisma in production

`prisma generate` runs during build (both Nixpacks and Dockerfile paths) — idempotent, safe to run twice.
`prisma migrate deploy` is manual — run it against Neon before deploying any schema-changing release:
```bash
DATABASE_URL="<neon-url>" npx prisma migrate deploy
```
<!-- END:deployment-rules -->
