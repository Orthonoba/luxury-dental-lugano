import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'es', 'it', 'de', 'fr'],
  defaultLocale: 'it',
  localePrefix: 'always',
  localeDetection: false,
})

export type Locale = (typeof routing.locales)[number]
