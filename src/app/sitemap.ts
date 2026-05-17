import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/config/site'

const routes = [
  { path: '',                    priority: 1.0, changeFrequency: 'weekly'  as const },
  { path: '/dental',             priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/facial-aesthetics',  priority: 0.9, changeFrequency: 'monthly' as const },
  { path: '/about',              priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/team',               priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/before-after',       priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/contact',            priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/testimonials',       priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/blog',               priority: 0.6, changeFrequency: 'weekly'  as const },
  { path: '/privacy-policy',          priority: 0.3, changeFrequency: 'yearly'  as const },
  { path: '/international-patients',  priority: 0.95, changeFrequency: 'monthly' as const },
]

const locales = ['en', 'de', 'fr', 'es']

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url
  const now = new Date()

  const italianRoutes = routes.map(({ path, priority, changeFrequency }) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))

  const localizedRoutes = locales.flatMap((locale) =>
    routes.map(({ path, priority, changeFrequency }) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority: priority * 0.9,
    }))
  )

  return [...italianRoutes, ...localizedRoutes]
}
