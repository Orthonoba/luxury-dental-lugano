import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['it', 'es', 'en'],
  defaultLocale: 'it',
  localePrefix: 'always',
  localeDetection: false,
})

export type Locale = (typeof routing.locales)[number]
