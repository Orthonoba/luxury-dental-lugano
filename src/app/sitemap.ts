import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/config/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url
  const now = new Date()

  return [
    { url: base,                              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/dental`,                  lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/facial-aesthetics`,       lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/about`,                   lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/team`,                    lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/before-after`,            lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/contact`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/testimonials`,            lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`,                    lastModified: now, changeFrequency: 'weekly',  priority: 0.6 },
  ]
}
