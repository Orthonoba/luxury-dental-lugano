@AGENTS.md

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
