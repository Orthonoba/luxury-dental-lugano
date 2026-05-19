import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/config/site'

const routes = [
  { path: '',                          priority: 1.0,  changeFrequency: 'weekly'  as const },
  { path: '/dental',                   priority: 0.9,  changeFrequency: 'monthly' as const },
  { path: '/facial-aesthetics',        priority: 0.9,  changeFrequency: 'monthly' as const },
  { path: '/about',                    priority: 0.8,  changeFrequency: 'monthly' as const },
  { path: '/team',                     priority: 0.8,  changeFrequency: 'monthly' as const },
  { path: '/before-after',             priority: 0.8,  changeFrequency: 'monthly' as const },
  { path: '/contact',                  priority: 0.8,  changeFrequency: 'monthly' as const },
  { path: '/testimonials',             priority: 0.7,  changeFrequency: 'monthly' as const },
  { path: '/blog',                     priority: 0.6,  changeFrequency: 'weekly'  as const },
  { path: '/privacy-policy',           priority: 0.3,  changeFrequency: 'yearly'  as const },
  { path: '/international-patients',   priority: 0.95, changeFrequency: 'monthly' as const },
  { path: '/sleep-dentistry',          priority: 0.8,  changeFrequency: 'monthly' as const },
  { path: '/mouthguards',              priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/retainers',                priority: 0.75, changeFrequency: 'monthly' as const },
  { path: '/digital-smile-design',     priority: 0.85, changeFrequency: 'monthly' as const },
  { path: '/stl-gallery',              priority: 0.7,  changeFrequency: 'weekly'  as const },
  { path: '/languages',                priority: 0.7,  changeFrequency: 'monthly' as const },
]

const locales = ['en', 'es', 'it', 'de', 'fr']

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url
  const now = new Date()

  return locales.flatMap((locale) =>
    routes.map(({ path, priority, changeFrequency }) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority: locale === 'it' ? priority : priority * 0.9,
    }))
  )
}
