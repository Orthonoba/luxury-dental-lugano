# Tech Stack & Skills — Luxury Dental Paradiso

## Core Stack

| Technology | Version | Role |
|---|---|---|
| Next.js | 16.2.6 | Framework (App Router) |
| React | 19.2.4 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling (utility-first) |
| Framer Motion | 12.x | Animations |
| clsx | latest | Conditional class utility |
| tailwind-merge | latest | Tailwind class conflict resolver |

---

## Project Structure

```
src/
├── app/              Next.js App Router pages
├── components/
│   ├── layout/       Navbar, Footer
│   ├── hero/         HeroSection
│   ├── sections/     Page sections (Philosophy, Dental, Facial, Team, etc.)
│   ├── gallery/      BeforeAfterGallery
│   ├── floating/     WhatsAppButton
│   ├── ui/           (Future: shadcn/ui primitives)
│   └── animations/   (Future: animation wrappers)
├── constants/        navigation, colors, typography
├── data/             treatments, testimonials
├── types/            TypeScript interfaces
├── hooks/            useScroll, useWindowSize
├── lib/              utils (cn function)
├── config/           site.ts (global config)
├── services/         (Future: API calls)
├── styles/           animations.css
└── utils/            (Future: helper functions)
```

---

## Key Patterns

### Tailwind v4 Usage

This project uses Tailwind v4 — NOT v3. Key differences:
- Config: `@import "tailwindcss"` in CSS (no `tailwind.config.js` required)
- Custom colours: defined in `@theme {}` block in globals.css
- Content detection: automatic (no explicit `content` array)

### `cn()` Utility

```ts
import { cn } from '@/lib/utils'

// Merges classes, resolves Tailwind conflicts
cn('px-4 py-2', isActive && 'bg-gold', 'px-6') // → 'py-2 bg-gold px-6'
```

### Framer Motion Convention

```tsx
// Scroll-triggered (use for sections)
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
>

// Mount animation (use for hero/page-load)
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
```

---

## Planned Additions

### shadcn/ui (When Ready)
```bash
npx shadcn@latest init
```
Components will go in `src/components/ui/`.

### Image Optimisation
Use `next/image` for all images. Place assets in `public/images/`.

### Font Optimisation
Fonts are already optimised via `next/font/google` in `src/app/layout.tsx`.

---

## Dev Commands

```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Production server
npm run lint     # ESLint check
npx tsc --noEmit # TypeScript check
```

---

## Environment Variables

Required for production (create `.env.local`):
```env
NEXT_PUBLIC_SITE_URL=https://luxurydental.com
NEXT_PUBLIC_WHATSAPP_NUMBER=15551234567
```
