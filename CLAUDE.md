@AGENTS.md

---

## Multilingual Architecture

### Locale routing

`src/i18n/routing.ts` — defines locales, default, and prefix strategy.

| Setting | Value | Effect |
|---|---|---|
| `locales` | `['en', 'es', 'it', 'de', 'fr']` | English, Spanish, Italian, German, French |
| `defaultLocale` | `'en'` | English is the primary language |
| `localePrefix` | `'always'` | All locales use an explicit URL prefix |
| `localeDetection` | `false` | No browser-header sniffing |

**Routes:** `/en`, `/es`, `/it`, `/de`, `/fr` — visiting `/` redirects to `/en` via next-intl middleware.

### Translation files

`src/translations/{locale}.json` — one JSON per locale (`en.json`, `es.json`, `it.json`, `de.json`, `fr.json`).

Top-level namespaces:

| Namespace | Used by |
|---|---|
| `nav` | Navbar (navLinks, bookNow) |
| `hero` | HeroSection (badge, headlines, CTAs, stats, scroll) |
| `philosophy` | PhilosophySection (eyebrow, headlines, pillars array) |
| `contact` | ContactSection (form labels, service list, hours, success state) |
| `footer` | Footer (CTA block, pills, links, columns, micro-footer) |
| `latin` | LatinPatientSection (headline, features, floating cards) |
| `common` | Shared CTAs (bookConsultation, learnMore, contactUs, viewAll) |

### Using translations in components

Client components use `useTranslations(namespace)` from `next-intl`:

```tsx
import { useTranslations } from 'next-intl'
const t = useTranslations('nav')
return <span>{t('bookNow')}</span>
```

Arrays in JSON (e.g. `philosophy.pillars`) are accessed with index notation:
`t('pillars.0.title')`, `t('pillars.1.description')`, etc.

### Locale-aware navigation

**Always** import `Link`, `usePathname`, `useRouter` from `@/navigation` (NOT `next/link` or `next/navigation`) for locale-aware routing. The `@/navigation` module wraps next-intl's `createNavigation(routing)`.

```tsx
import { Link, usePathname, useRouter } from '@/navigation'
```

### Language switcher

`Navbar.tsx` — shows IT, ES, EN pills (desktop dropdown + mobile pills). Switches locale via `router.replace(pathname, { locale })`. No page reload, locale persists across navigation.

### SEO — multilingual

`src/app/layout.tsx`:
- `metadata.alternates.languages` maps all locale URLs including `x-default → /it`
- Manual `<link rel="alternate" hrefLang="...">` tags in `<head>` for broad crawler support
- OpenGraph `locale: 'it_IT'` with `alternateLocale: ['es_ES', 'en_GB']`

`src/app/sitemap.ts`:
- Generates all locale-prefixed URLs (`/it/...`, `/es/...`, `/en/...`)
- Italian routes have full priority; others are weighted at ×0.9

### Adding a new locale (future)

1. Add locale code to `routing.ts` `locales` array
2. Create `src/translations/{locale}.json` mirroring the existing structure
3. Add the locale to `LOCALES` array in `Navbar.tsx`
4. Update `layout.tsx` `metadata.alternates.languages` and `<link hrefLang>` tags

---

## Animation Architecture

### Core motion library

`src/lib/animations.ts` — all Framer Motion variant presets and transition configs.

Key exports:

| Export | Type | Description |
|---|---|---|
| `LUXURY_EASE` | `[number,number,number,number]` | Cubic bezier `[0.22,1,0.36,1]` — used everywhere |
| `fadeUp` | Variants | Opacity + y:24 → y:0 |
| `fadeIn` | Variants | Opacity fade |
| `blurIn` / `blurReveal` | Variants | Opacity + blur(12px) → blur(0) |
| `scaleIn` | Variants | Spring scale 0.9→1 |
| `slideInLeft` / `slideLeft` | Variants | Slide from x:-32 |
| `slideInRight` / `slideRight` | Variants | Slide from x:32 |
| `stagger` | Variants | `staggerChildren: 0.1` |
| `staggerFast` | Variants | `staggerChildren: 0.06` |
| `staggerSlow` | Variants | `staggerChildren: 0.18` |
| `staggerContainer` | Variants | `staggerChildren: 0.12, delayChildren: 0.1` |
| `floatAnimation` / `floatingAnimation` | animate object | Infinite y float (6s) |
| `floatSlow` | animate object | Slow infinite y float (8s) |
| `hoverLift` | rest/hover object | y:-6, scale:1.01 |
| `hoverGlow` | rest/hover object | olive box-shadow |
| `premiumHover` | rest/hover object | y:-8, scale:1.02, luxury shadow |
| `cardHover` | rest/hover object | y:-6, scale:1.01, soft shadow |
| `smoothTransition` | transition config | `{ duration:0.7, ease: LUXURY_EASE }` |
| `revealLine` | Variants | scaleX 0→1 for decorative lines |
| `popIn` | Variants | Spring pop scale 0.85→1 |

### Reusable animation components

`src/components/animations/`

- `FadeUp` — wraps children with `whileInView` fadeUp
- `Stagger` — wraps children with `whileInView` stagger
- `MotionSection` — wraps a `<section>` with `whileInView` fadeIn
- `ParallaxLayer` — parallax y drift on scroll using `useScroll`
- `GlassCard` — glassmorphism card with optional hoverLift
- `MagneticButton` — magnetic cursor-following hover effect

### CSS animation utilities

`src/styles/animations.css` (imported via `globals.css`):

- `.animate-fade-up` — CSS fadeUp with GPU hints
- `.animate-blur-reveal` — CSS blur reveal
- `.animate-float` — infinite float (GPU optimized)
- `.animate-border-glow` — pulsing gold border
- `.animate-glow-pulse` — pulsing gold box-shadow
- `.animate-gradient-drift` — animated gradient background
- `.animate-scale-breathe` — gentle scale pulse
- `.animate-shimmer-gold` — shimmer gold gradient text

`src/app/globals.css` utility classes:

- `.transform-gpu` — `translateZ(0)` + backface-visibility for GPU compositing
- `.will-change-transform` / `.will-change-opacity` — performance hints
- `.glass-dark` / `.glass-light` / `.glass-gold` — glassmorphism variants
- `.gradient-gold-text` — gold gradient text
- `.shadow-luxury` / `.shadow-card` / `.shadow-gold-glow` — cinematic shadows

### Scroll warning fix

`src/app/layout.tsx` — `<body>` has `className="... relative"`. This ensures Framer Motion's `useScroll` can find a positioned scroll container ancestor, eliminating the *"non-static position"* console warning in v12.

### Swiper usage

`TestimonialsSection.tsx` uses modules: `Autoplay`, `Pagination`, `EffectFade`, `A11y`, `Mousewheel`.

Mousewheel is enabled with `forceToAxis: true` to prevent accidental page scroll hijack while still allowing intentional swipe-through on desktop.

### Performance strategy

- All `whileInView` animations use `viewport={{ once: true }}` — fire once, no re-trigger
- Floating orbs use `animate` (continuous) — limited to non-critical decorative elements
- GPU compositing: inline `transform: translateZ(0)` via `transform-gpu` class or Framer Motion's automatic GPU promotion
- `will-change` is set only on elements that animate, via CSS utilities or `style={{ willChange: 'transform' }}`
- `@media (prefers-reduced-motion: reduce)` disables all CSS animations; Framer Motion respects the system setting automatically via its `motionConfig`

### Accessibility

- All animated sections use `viewport={{ once: true }}` so content doesn't re-animate
- Reduced-motion: CSS disables all `animation` and `transition` durations; Framer Motion v12 respects `prefers-reduced-motion` natively
- Before/after comparison slider (`BeforeAfterGallery`) is keyboard-accessible with arrow keys
