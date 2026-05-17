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

With next-intl: Italian uses no prefix (`/`), others use locale prefix (`/en/`, `/de/`, `/fr/`, `/es/`).

## Architecture Decisions

1. **Dark Navbar**: Always dark glass (`bg-[#0a0d06]/85 backdrop-blur-xl`) to match the dark hero — not white-on-scroll.
2. **Hero Layout**: Split 3/5 (text) + 2/5 (image placeholder) on desktop, full-width on mobile.
3. **Testimonials**: 6-second auto-rotation, dark LuxuryCard, decorative quotation mark, Google Reviews badge. Rating hero block at top (5.0 score).
4. **Contact**: `Input`/`Textarea` UI components for form fields, `<select>` kept raw with shared CSS class, golden ratio map placeholder.
5. **JSON-LD**: Dentist schema in `layout.tsx` `<head>` via `dangerouslySetInnerHTML`.
6. **IntlProvider**: Wraps `<body>` children in root layout — do NOT add second provider in pages.

---

## Multilingual Architecture (updated)

5 locales: `['it', 'en', 'de', 'fr', 'es']` — Spanish added for Latin American patient targeting.

- `src/navigation.ts` — locale-aware `Link`, `useRouter`, `usePathname` via `createNavigation(routing)`. **Always import from `@/navigation` in client components that need locale switching.**
- Default: `it` (Italian) — no URL prefix. Others: `/en/`, `/de/`, `/fr/`, `/es/`

**Spanish is critical**: The clinic targets Latin American patients and Spanish-speaking expats. All new copy-facing features should consider ES translations.

---

## Navbar Architecture (updated)

- **Breakpoint**: `xl:` (1280px+) for full 9-link desktop nav. Below xl: hamburger menu.
- **9 links**: Home, About, Dental, Facial, Gallery (before-after), Team, Testimonials, Blog, Contact
- **Language dropdown**: AnimatePresence dropdown with 5 locales (IT/EN/DE/FR/ES). Uses `router.replace(pathname, { locale })` from `@/navigation` for real routing.
- **Active locale**: `useLocale()` from `next-intl`
- **CTA**: "Book Consultation" → `/contact` (olive bg)
- **Click-outside close**: `useEffect` + `document.addEventListener('mousedown', handler)` on `langRef`

---

## Footer Strategy (3-section structure)

Section A — **Cinematic CTA Block** (dark, full-width)
- 4 service pills (gold border)
- Large Playfair headline + gradient accent
- 3 CTA buttons: "Book Consultation" (olive) / "WhatsApp" (ghost) / "Call the Clinic" (ghost)

Section B — **4-column grid**
| Col | Content |
|---|---|
| Clinic (col 1) | Logo + tagline + clinic links (About, Philosophy, Technology, Team) |
| Treatments (col 2) | Smile Design, Veneers, Aligners, Sleep Dentistry, Facial Aesthetics |
| Contact (col 3) | Address, dual phones, email, hours from `SITE_CONFIG` |
| Social (col 4) | IG, FB, LinkedIn, Google Reviews + Google rating badge |

Section C — **Micro footer**
- Copyright + Privacy Policy / Sitemap / Terms links

**Footer.tsx is a Server Component** — no `'use client'`.

---

## Latin Marketing Strategy

`LatinPatientSection` (`src/components/sections/LatinPatientSection.tsx`) — new homepage section between Testimonials and ContactSection.

- **Target**: Spanish-speaking patients, Latin American dental tourism, expats
- **WhatsApp CTA**: direct link to `wa.me/41916826805` with pre-filled Spanish message
- **Decorative visual**: floating card composition (Español pill, Lugano badge, rating circle)
- **Animations**: `stagger` container, `fadeUp` on text, `scaleIn` on decorative elements

---

## Conversion Strategy

1. **Footer CTA Block** (Section A): always visible above the fold of the footer — 3 conversion paths
2. **WhatsApp float button**: persistent bottom-right on all pages
3. **LatinPatientSection**: dedicated Spanish-market touchpoint with WhatsApp + booking
4. **Navbar CTA**: "Book Consultation" on all pages
5. **Google Reviews badge**: in Testimonials section rating block + Footer social column

---

## Premium CTA Structure

| Location | Label | Action |
|---|---|---|
| Navbar (desktop + mobile) | Book Consultation | `/contact` |
| Footer Section A (primary) | Book Consultation | `/contact` |
| Footer Section A (secondary) | WhatsApp | `wa.me/...` |
| Footer Section A (tertiary) | Call the Clinic | `tel:...` |
| LatinPatientSection | Escríbenos por WhatsApp | `wa.me/41916826805?text=...` |
| LatinPatientSection | Reservar Consulta | `/contact` |
| WhatsApp float | — | `wa.me/...` |

---

## Animation System (updated)

New variants added to `src/lib/animations.ts`:
- `slideUp` — opacity + y:40→0, 0.9s duration
- `blurIn` — opacity + blur:12px→0, 0.8s duration

---

## Responsive Breakpoints (navbar)

| Width | Nav behaviour |
|---|---|
| < 1280px (`xl:`) | Hamburger menu, all 9 links in slide-down panel |
| ≥ 1280px (`xl:`) | Full 9-link horizontal nav + language dropdown |
