import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import './globals.css'
import CookieConsent from '@/components/ui/CookieConsent'
import GoogleAnalytics from '@/components/ui/GoogleAnalytics'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
})

const BASE_URL = 'https://www.luxurydental.ch'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Luxury Dental Paradiso | Lugano, Svizzera',
    template: '%s | Luxury Dental Paradiso — Lugano',
  },
  description:
    'Clinica dentale premium e di estetica facciale a Lugano, Svizzera. Digital Smile Design, Faccette in Porcellana, Allineatori Trasparenti e trattamenti facciali avanzati con precisione svizzera ed eccellenza artistica.',
  keywords:
    'dentista Lugano, clinica dentale Svizzera, Digital Smile Design Svizzera, estetica facciale Lugano, dentistica estetica Ticino, faccette Lugano, allineatori Svizzera, sbiancamento denti Lugano, faccette in porcellana, anti-aging Lugano, ringiovanimento pelle, Paradiso Lugano, studio dentistico Ticino, Dentista en Lugano, Clínica Dental Suiza, Diseño de Sonrisa Suiza, Estética Facial Lugano, Luxury Dentist Lugano, Swiss Dental Clinic',
  authors: [{ name: 'Luxury Dental & Facial Estética' }],
  openGraph: {
    title: 'Luxury Dental Paradiso — Lugano, Svizzera',
    description:
      'Dove la precisione svizzera incontra la bellezza naturale. Clinica premium di odontoiatria ed estetica facciale a Lugano.',
    type: 'website',
    locale: 'en_GB',
    alternateLocale: ['es_ES', 'it_IT', 'de_DE', 'fr_FR'],
    url: `${BASE_URL}/en`,
    siteName: 'Luxury Dental Paradiso',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Dental Paradiso — Lugano, Svizzera',
    description: 'Digital Smile Design & Estetica Facciale — Precisione svizzera, bellezza naturale.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: `${BASE_URL}/en`,
    languages: {
      'en': `${BASE_URL}/en`,
      'es': `${BASE_URL}/es`,
      'it': `${BASE_URL}/it`,
      'de': `${BASE_URL}/de`,
      'fr': `${BASE_URL}/fr`,
      'x-default': `${BASE_URL}/en`,
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'Luxury Dental & Facial Estética',
  url: BASE_URL,
  telephone: ['+41919945051', '+41916826805'],
  email: 'info@luxurydental.ch',
  image: `${BASE_URL}/og-image.jpg`,
  description: 'Clinica dentale premium e di estetica facciale a Lugano, Svizzera.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Riva Paradiso 4',
    addressLocality: 'Paradiso',
    addressRegion: 'Ticino',
    postalCode: '6900',
    addressCountry: 'CH',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 46.0037,
    longitude: 8.9511,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '19:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '10:00',
      closes: '17:00',
    },
  ],
  priceRange: '$$$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '8',
  },
  medicalSpecialty: ['Dentistry', 'Cosmetic Dentistry', 'Aesthetic Medicine'],
  availableLanguage: ['English', 'Spanish', 'German', 'French'],
  areaServed: [
    { '@type': 'City', name: 'Lugano' },
    { '@type': 'State', name: 'Ticino' },
    { '@type': 'Country', name: 'Switzerland' },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* hreflang for multilingual SEO */}
        <link rel="alternate" hrefLang="en" href={`${BASE_URL}/en`} />
        <link rel="alternate" hrefLang="es" href={`${BASE_URL}/es`} />
        <link rel="alternate" hrefLang="it" href={`${BASE_URL}/it`} />
        <link rel="alternate" hrefLang="de" href={`${BASE_URL}/de`} />
        <link rel="alternate" hrefLang="fr" href={`${BASE_URL}/fr`} />
        <link rel="alternate" hrefLang="x-default" href={`${BASE_URL}/en`} />
      </head>
      <body className="min-h-screen antialiased relative">
        {children}
        <CookieConsent locale={locale} />
        <GoogleAnalytics />
      </body>
    </html>
  )
}
