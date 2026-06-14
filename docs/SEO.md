# SEO Strategy — Luxury Dental Paradiso

## Current Implementation

### Global Metadata (src/app/layout.tsx)

```ts
title: "Luxury Dental & Facial Estética | Digital Smile Design"
description: "Premium dental and facial aesthetics clinic..."
keywords: "luxury dental, digital smile design, facial aesthetics..."
openGraph: { type: 'website', locale: 'en_US' }
twitter: { card: 'summary_large_image' }
robots: { index: true, follow: true }
```

### Centralised Config

All SEO metadata is sourced from `src/config/site.ts` — update once, applies everywhere.

---

## Page-Level SEO Roadmap

Each route in `src/app/` should export its own `generateMetadata` function:

```ts
// src/app/dental/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Precision Dental Treatments | Digital Smile Design & Veneers',
  description: 'Expert dental treatments including Digital Smile Design, Clear Aligners, and Porcelain Veneers. Swiss precision, Beverly Hills luxury.',
  openGraph: {
    title: 'Precision Dental Treatments',
    images: [{ url: '/images/og/dental.jpg', width: 1200, height: 630 }],
  },
}
```

---

## Structured Data (Next Steps)

Add JSON-LD schemas for:

```ts
// Dental clinic schema
{
  "@type": "Dentist",
  "name": "Luxury Dental & Facial Estética",
  "address": { ... },
  "telephone": "+1 (555) 123-4567",
  "openingHours": ["Mo-Fr 09:00-19:00", "Sa 10:00-17:00"],
  "priceRange": "$$$$",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9" }
}
```

Implement via `<Script type="application/ld+json">` in layout or page.

---

## Target Keywords

### Primary (High Intent)
- `luxury dental clinic beverly hills`
- `digital smile design`
- `porcelain veneers beverly hills`
- `clear aligners premium`

### Secondary (Service Pages)
- `teeth whitening professional`
- `facial aesthetics near me`
- `anti-aging facial treatments`
- `dental sleep dentistry`

### Long-tail (Blog / Content)
- `how long do porcelain veneers last`
- `digital smile design process`
- `invisalign vs clear aligners comparison`

---

## Technical SEO Checklist

- [x] `robots: { index: true, follow: true }` in layout
- [x] OpenGraph metadata
- [x] Twitter card metadata
- [ ] `sitemap.xml` — add `src/app/sitemap.ts`
- [ ] `robots.txt` — add `src/app/robots.ts`
- [ ] Canonical URLs per page
- [ ] Image `alt` attributes on all `<Image>` components
- [ ] Core Web Vitals optimisation (LCP, CLS, FID)
- [ ] Structured data (JSON-LD)
- [ ] Google Analytics / Tag Manager

---

## Sitemap Implementation

```ts
// src/app/sitemap.ts
import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_CONFIG.url, lastModified: new Date(), priority: 1 },
    { url: `${SITE_CONFIG.url}/dental`, priority: 0.9 },
    { url: `${SITE_CONFIG.url}/facial-aesthetics`, priority: 0.9 },
    { url: `${SITE_CONFIG.url}/team`, priority: 0.7 },
    { url: `${SITE_CONFIG.url}/before-after`, priority: 0.8 },
    { url: `${SITE_CONFIG.url}/contact`, priority: 0.8 },
    { url: `${SITE_CONFIG.url}/blog`, priority: 0.6 },
  ]
}
```
