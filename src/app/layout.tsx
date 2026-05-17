import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import IntlProvider from '@/providers/IntlProvider'
import './globals.css'

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

export const metadata: Metadata = {
  metadataBase: new URL('https://www.luxurydental.ch'),
  title: {
    default: 'Luxury Dental Paradiso | Lugano, Switzerland',
    template: '%s | Luxury Dental Paradiso — Lugano',
  },
  description:
    'Premium dental and facial aesthetics clinic in Lugano, Switzerland. Digital Smile Design, Porcelain Veneers, Clear Aligners, and advanced facial treatments with Swiss precision and artistic excellence.',
  keywords:
    'Luxury Dentist Lugano, Swiss Dental Clinic, Digital Smile Design Switzerland, Facial Aesthetics Lugano, dental aesthetics Ticino, veneers Lugano, clear aligners Switzerland, teeth whitening Lugano, porcelain veneers, anti-aging Lugano, skin rejuvenation, Paradiso Lugano, dentista Lugano, studio dentistico Ticino, Dentista en Lugano, Clínica Dental Suiza, Diseño de Sonrisa Suiza, Estética Facial Lugano, Dentista Suiza, tratamiento dental Lugano, clinica dental premium Suiza',
  authors: [{ name: 'Luxury Dental & Facial Estética' }],
  openGraph: {
    title: 'Luxury Dental Paradiso — Lugano, Switzerland',
    description:
      'Where Swiss precision meets natural beauty. Premium dental and facial aesthetics in Lugano.',
    type: 'website',
    locale: 'it_IT',
    url: 'https://www.luxurydental.ch',
    siteName: 'Luxury Dental Paradiso',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Luxury Dental Paradiso — Lugano, Switzerland',
    description: 'Digital Smile Design & Facial Aesthetics — Swiss precision, natural beauty.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://www.luxurydental.ch',
    languages: {
      it: 'https://www.luxurydental.ch',
      en: 'https://www.luxurydental.ch/en',
      de: 'https://www.luxurydental.ch/de',
      fr: 'https://www.luxurydental.ch/fr',
      es: 'https://www.luxurydental.ch/es',
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'Luxury Dental & Facial Estética',
  url: 'https://www.luxurydental.ch',
  telephone: ['+41919945051', '+41916826805'],
  email: 'info@luxurydental.ch',
  image: 'https://www.luxurydental.ch/og-image.jpg',
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const messages = (await import(`../translations/${locale}.json`)).default as Record<string, any>

  return (
    <html lang={locale} className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <IntlProvider locale={locale} messages={messages}>
          {children}
        </IntlProvider>
      </body>
    </html>
  )
}
