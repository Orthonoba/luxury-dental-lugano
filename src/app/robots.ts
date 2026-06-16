import type { MetadataRoute } from 'next'
import { SITE_CONFIG } from '@/config/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/crm',
        '/crm/',
        '/en/portal',
        '/it/portal',
        '/es/portal',
        '/de/portal',
        '/fr/portal',
      ],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  }
}
