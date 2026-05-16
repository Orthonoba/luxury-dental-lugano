# Claude Project Notes — Luxury Dental Paradiso

## Quick Reference

- **Framework**: Next.js 16.2.6 (App Router)
- **Styling**: Tailwind v4 — `@import "tailwindcss"` + `@theme {}` in globals.css
- **Alias**: `@/` → `src/` (tsconfig.json)
- **Animations**: Framer Motion 12.x
- **i18n**: next-intl 4.x (locales: it, en, de, fr — default: it)

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

## UI Component System (`src/components/ui/`)

| Component | Props | Usage |
|---|---|---|
| `Button` | `variant` (primary/secondary/ghost/outline), `size` (sm/md/lg), `href?` | Primary CTA, nav CTAs |
| `SectionTitle` | `eyebrow?`, `title`, `accentWord?`, `subtitle?`, `align?`, `theme?` | All section headers |
| `Container` | `variant` (narrow/default/wide), `as?` | Page layout wrappers |
| `LuxuryCard` | `theme` (light/dark) | Cards, testimonial cards |
| `Input` | `label?`, `error?` + HTMLInput attrs | Form fields |
| `Textarea` | `label?`, `error?`, `rows?` + HTMLTextarea attrs | Form textarea |
| `Badge` | `variant` (gold/olive/dark) | Tags, labels |
| `PageHero` | `eyebrow`, `title`, `titleAccent?`, `subtitle?` | Inner page heroes |
| `ImagePlaceholder` | `aspectRatio?`, `label?` | Image placeholders |

## Animation System

### Presets (`src/lib/animations.ts`)
```ts
LUXURY_EASE  // [0.22, 1, 0.36, 1]
fadeUp       // opacity 0→1, y 24→0
fadeIn       // opacity 0→1
stagger      // staggerChildren: 0.1
scaleIn      // scale 0.9→1 spring
slideInLeft  // opacity + x -32→0
slideInRight // opacity + x 32→0
floatAnimation  // y [0,-12,0] repeat Infinity (use as animate= prop)
floatSlow       // y [0,-8,0] slower variant
```

### Wrapper Components (`src/components/animations/`)
```tsx
<FadeUp delay={0.2}>content</FadeUp>              // scroll-triggered
<Stagger className="grid">children</Stagger>       // stagger container
<MotionSection>entire section</MotionSection>      // section wrapper
```

### Usage Pattern
```tsx
// Stagger + fadeUp (for lists)
<motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  <motion.div variants={fadeUp}>item 1</motion.div>
  <motion.div variants={fadeUp}>item 2</motion.div>
</motion.div>

// Float (for decorative orbs)
<motion.div animate={floatAnimation}>...</motion.div>
```

## Multilingual Architecture (next-intl v4)

### Files
- `src/i18n/routing.ts` — locale config (locales, defaultLocale, localePrefix, localeDetection)
- `src/i18n/request.ts` — server-side message loading
- `middleware.ts` (root) — next-intl routing middleware
- `src/translations/{it,en,de,fr}.json` — message files
- `src/providers/IntlProvider.tsx` — client-side `NextIntlClientProvider` wrapper

### Configuration
```ts
// src/i18n/routing.ts
locales: ['it', 'en', 'de', 'fr']
defaultLocale: 'it'
localePrefix: 'as-needed'   // Italian at /, others at /en/, /de/, /fr/
localeDetection: false       // No browser-language redirects
```

### Middleware Matcher
```ts
// middleware.ts — CRITICAL: must exclude static files
matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
```

### How to add translations
1. Add key to all 4 JSON files in `src/translations/`
2. In Server Components: `const t = await getTranslations('namespace')`
3. In Client Components: `const t = useTranslations('namespace')`

## Responsive Breakpoints

| Breakpoint | Width | Use |
|---|---|---|
| base | 375px | Mobile-first |
| `sm:` | 640px | Two-column forms |
| `md:` | 768px | Team grid |
| `lg:` | 1024px | Desktop nav, sticky columns |
| `xl:` | 1280px | Max-width reached |
| `2xl:` | 1536px | Ultrawide (wide container variant) |

## Key Files

- `src/app/layout.tsx` — root layout (async, getLocale, JSON-LD structured data, IntlProvider)
- `src/app/globals.css` — Tailwind v4 config + custom @theme
- `src/config/site.ts` — single source of truth for site data
- `src/lib/utils.ts` — `cn()` utility for class merging
- `src/lib/animations.ts` — Framer Motion variant presets

## Routing

All routes live in `src/app/`. Current routes:
`/` `/about` `/dental` `/facial-aesthetics` `/before-after` `/team` `/testimonials` `/contact` `/blog` `/privacy-policy`

With next-intl: Italian uses no prefix (`/`), others use locale prefix (`/en/`, `/de/`, `/fr/`).

## Architecture Decisions

1. **Dark Navbar**: Always dark glass (`bg-[#0a0d06]/85 backdrop-blur-xl`) to match the dark hero — not white-on-scroll.
2. **Hero Layout**: Split 3/5 (text) + 2/5 (image placeholder) on desktop, full-width on mobile.
3. **Testimonials**: 6-second auto-rotation, dark LuxuryCard, decorative quotation mark, Google Reviews badge.
4. **Contact**: `Input`/`Textarea` UI components for form fields, `<select>` kept raw with shared CSS class, golden ratio map placeholder.
5. **JSON-LD**: Dentist schema in `layout.tsx` `<head>` via `dangerouslySetInnerHTML`.
6. **IntlProvider**: Wraps `<body>` children in root layout — do NOT add second provider in pages.
