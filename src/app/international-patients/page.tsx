import type { Metadata } from 'next'
import { Navbar, Footer } from '@/components/layout'
import { WhatsAppButton } from '@/components/floating'
import InternationalPatientsContent from './InternationalPatientsContent'

export const metadata: Metadata = {
  title: 'Dentista en Lugano | Clínica Dental Premium para Pacientes Internacionales',
  description:
    'Clínica dental de lujo en Lugano, Suiza. Atención personalizada en español para pacientes internacionales. Diseño de sonrisa, carillas, invisalign y estética facial con precisión suiza. José Gregorio Rodriguez — Coordinador Internacional.',
  keywords:
    'Dentista en Lugano, Clínica Dental Suiza, Carillas Dentales Suiza, Diseño de Sonrisa Suiza, Invisalign Suiza, Dentista para Latinos en Suiza, dentista español Lugano, clínica dental Lugano Suiza, pacientes internacionales Suiza, odontología estética Lugano, veneers Suiza, blanqueamiento dental Suiza',
  openGraph: {
    title: 'Dentista en Lugano — Luxury Dental Paradiso | Pacientes Internacionales',
    description:
      'Experiencia dental de lujo en Lugano, Suiza. Atención en español, transformaciones premium y precisión suiza para pacientes de toda América Latina.',
    type: 'website',
    locale: 'es_ES',
    url: 'https://www.luxurydental.ch/international-patients',
    siteName: 'Luxury Dental Paradiso',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dentista en Lugano — Luxury Dental Paradiso',
    description: 'Diseño de Sonrisa & Estética Dental — Precisión suiza, atención en español.',
  },
  alternates: {
    canonical: 'https://www.luxurydental.ch/international-patients',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'Luxury Dental Paradiso — Pacientes Internacionales',
  url: 'https://www.luxurydental.ch/international-patients',
  telephone: '+41765259395',
  email: 'info@luxurydental.ch',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Riva Paradiso 4',
    addressLocality: 'Paradiso',
    addressRegion: 'Ticino',
    postalCode: '6900',
    addressCountry: 'CH',
  },
  availableLanguage: ['Spanish', 'Italian', 'English'],
  priceRange: '$$$$',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    reviewCount: '8',
  },
}

export default function InternationalPatientsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main>
        <InternationalPatientsContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
