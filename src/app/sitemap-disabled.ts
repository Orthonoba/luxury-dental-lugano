import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/config/site'
import { sanityFetch } from '@/sanity/lib/live'
import { allPostSlugsQuery } from '@/sanity/lib/queries'

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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_CONFIG.url
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    routes.map(({ path, priority, changeFrequency }) => ({
      url: `${base}/${locale}${path}`,
      lastModified: now,
      changeFrequency,
      priority: locale === 'it' ? priority : priority * 0.9,
    }))
  )

  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const result = await sanityFetch<{ slug: string }[]>({ query: allPostSlugsQuery })
    const slugs = result.data ?? []
    blogEntries = locales.flatMap((locale) =>
      slugs.map(({ slug }) => ({
        url: `${base}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: locale === 'it' ? 0.7 : 0.63,
      }))
    )
  } catch {
    blogEntries = []
  }

  return [...staticEntries, ...blogEntries]
}
