# AI Agent Configuration — Luxury Dental Paradiso

## Project Context for AI Agents

This is a premium Next.js 16 + Tailwind v4 luxury dental clinic website.
Architecture: `src/` layout with App Router, TypeScript strict mode.

## Critical Rules

1. **Tailwind v4** — config lives in `src/app/globals.css` via `@theme {}`. No `tailwind.config.js`.
2. **`@/` alias** → resolves to `src/` (configured in `tsconfig.json`).
3. **Barrel imports** — always import components from barrel files:
   ```ts
   import { Navbar } from '@/components/layout'    // ✓
   import Navbar from '@/components/layout/Navbar' // ✓ (also acceptable)
   ```
4. **Footer.tsx** — server component, no `'use client'` directive.
5. **Read docs first** — `node_modules/next/dist/docs/` for Next.js 16 conventions.

## Architecture Reference

```
src/components/layout/   → Navbar, Footer
src/components/hero/     → HeroSection
src/components/sections/ → PhilosophySection, DentalTreatments, FacialAesthetics,
                           TeamSection, TestimonialsSection, ContactSection
src/components/gallery/  → BeforeAfterGallery
src/components/floating/ → WhatsAppButton
src/config/site.ts       → single source of truth for site metadata
src/constants/colors.ts  → colour values for JS/TS usage
src/lib/utils.ts         → cn() utility (clsx + tailwind-merge)
```

## Colour System

Custom Tailwind colours (use as Tailwind classes: `bg-gold`, `text-olive`, etc.):
- `gold` → `#C8A96B` (accent)
- `olive` → `#556B2F` (primary brand)
- `beige` → `#E8DCCB` (warm background)
- `beige-light` → `#F5F0E8` (secondary background)
- `luxury-black` → `#111111` (dark backgrounds/text)

## Do Not

- Do not add `'use client'` to Footer.tsx
- Do not create `tailwind.config.js` (v4 doesn't use it)
- Do not use relative imports for components — use `@/` aliases
- Do not change the `src/app/globals.css` `@theme {}` block without updating `src/constants/colors.ts`
