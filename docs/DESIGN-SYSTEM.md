# Design System — Luxury Dental Paradiso

## Philosophy

Swiss minimalism applied to luxury medical aesthetics. Every design decision prioritises:
- **Negative space** — breathing room over density
- **Editorial hierarchy** — type does the heavy lifting
- **Restraint** — one focal element per composition
- **Natural materials** — beige, olive, gold palette inspired by Swiss Alpine luxury

---

## Colour Palette

| Token | Value | Usage |
|---|---|---|
| `--color-beige` | `#E8DCCB` | Section backgrounds, warm neutrals |
| `--color-beige-light` | `#F5F0E8` | Secondary backgrounds, hover states |
| `--color-olive` | `#556B2F` | Primary brand accent, CTAs |
| `--color-olive-light` | `#6B8A3C` | Hover states for olive elements |
| `--color-gold` | `#C8A96B` | Premium accent, labels, highlights |
| `--color-gold-light` | `#D4B97A` | Hover states for gold elements |
| `--color-luxury-black` | `#111111` | Primary text, dark backgrounds |
| `--color-luxury-dark` | `#1A1A1A` | Secondary dark backgrounds |

**Never mix olive and gold as equals** — olive leads, gold accents.

---

## Typography

### Fonts

| Role | Font | Variable |
|---|---|---|
| Display / Headlines | Playfair Display | `--font-display` / `font-display` |
| Body / UI | Inter | `--font-sans` / `font-sans` |

### Scale

Headlines use fluid `clamp()` sizing — never fixed px on large headings:
```css
font-size: clamp(2.2rem, 4.5vw, 3.75rem);
```

### Tracking (letter-spacing)

| Context | Value | Tailwind |
|---|---|---|
| Section labels | `0.4em` | `tracking-[0.4em]` |
| Navigation | `0.2em` | `tracking-[0.2em]` |
| CTAs / buttons | `0.25em` | `tracking-[0.25em]` |
| Body | `normal` | `tracking-normal` |

**Rule**: ALL caps text must have wide tracking (≥ 0.15em). Never all-caps without tracking.

---

## Spacing

Base unit: `8px` (Tailwind default).
Section vertical rhythm: `py-32` (128px) for major sections.
Max content width: `max-w-7xl` (1280px) with `px-6 lg:px-8` padding.

---

## Component Patterns

### Section Header Pattern
```tsx
<span className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6">
  Label
</span>
<h2 className="font-display font-bold text-luxury-black leading-[1.08]"
    style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}>
  Headline
</h2>
```

### Card Hover Pattern
- Background: `hover:bg-beige-light` on white, `hover:bg-white/4` on dark
- Shadow: `hover:shadow-2xl hover:shadow-olive/8`
- Duration: `transition-all duration-400` (400ms, not 300ms, for luxury feel)

### CTA Button Pattern (Primary)
```tsx
<a className="px-8 py-4 bg-gold text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-2xl hover:shadow-gold/30 hover:-translate-y-0.5">
```

### CTA Button Pattern (Secondary/Outline)
```tsx
<a className="px-8 py-4 border border-white/15 text-white/80 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:bg-white/8 hover:border-white/30 transition-all duration-300">
```

---

## Animation Principles

All animations use Framer Motion with these easing curves:
- **Entry animations**: `ease: [0.22, 1, 0.36, 1]` (custom ease-out)
- **Scroll-triggered**: `whileInView` with `viewport={{ once: true }}`
- **Hover micro**: `transition-all duration-300` or `duration-400`
- **Spring**: `{ type: 'spring', stiffness: 180, damping: 14 }`

Standard entry stagger: `delay: index * 0.1` (100ms per item).

---

## Accessibility

- All interactive elements have `aria-label` when icon-only
- Form labels are always associated via `htmlFor`
- Colour contrast: gold on black ≥ 4.5:1 (WCAG AA)
- Reduced motion: handled via `@media (prefers-reduced-motion: reduce)` in `animations.css`
- Semantic HTML: `section`, `article`, `nav`, `footer`, `blockquote`, `figure`
