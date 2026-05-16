# Claude Project Notes — Luxury Dental Paradiso

## Quick Reference

- **Framework**: Next.js 16.2.6 (App Router)
- **Styling**: Tailwind v4 — `@import "tailwindcss"` + `@theme {}` in globals.css
- **Alias**: `@/` → `src/` (tsconfig.json)
- **Animations**: Framer Motion 12.x

## Before Editing

Read `node_modules/next/dist/docs/` for Next.js 16-specific behaviour.
This version has breaking changes from Next.js 14/15.

## Component Map

| Component | File | Type |
|---|---|---|
| Navbar | `src/components/layout/Navbar.tsx` | Client |
| Footer | `src/components/layout/Footer.tsx` | **Server** |
| HeroSection | `src/components/hero/HeroSection.tsx` | Client |
| PhilosophySection | `src/components/sections/PhilosophySection.tsx` | Client |
| DentalTreatments | `src/components/sections/DentalTreatments.tsx` | Client |
| FacialAesthetics | `src/components/sections/FacialAesthetics.tsx` | Client |
| BeforeAfterGallery | `src/components/gallery/BeforeAfterGallery.tsx` | Client |
| TeamSection | `src/components/sections/TeamSection.tsx` | Client |
| TestimonialsSection | `src/components/sections/TestimonialsSection.tsx` | Client |
| ContactSection | `src/components/sections/ContactSection.tsx` | Client |
| WhatsAppButton | `src/components/floating/WhatsAppButton.tsx` | Client |

## Key Files

- `src/app/layout.tsx` — root layout, fonts, global metadata
- `src/app/globals.css` — Tailwind v4 config + custom theme
- `src/config/site.ts` — single source of truth for site data
- `src/lib/utils.ts` — `cn()` utility for class merging

## Routing

All routes live in `src/app/`. Current routes:
`/` `/about` `/dental` `/facial-aesthetics` `/before-after` `/team` `/testimonials` `/contact` `/blog` `/privacy-policy`
