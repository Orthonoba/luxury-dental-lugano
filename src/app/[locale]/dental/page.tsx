import type { Metadata } from 'next'
import { Navbar, Footer } from '@/components/layout'
import { WhatsAppButton } from '@/components/floating'
import { PageHero } from '@/components/ui'
import DentalContent from './DentalContent'

export const metadata: Metadata = {
  title: 'Dental Treatments',
  description:
    'Explore our full range of premium dental treatments in Lugano: Digital Smile Design, Porcelain Veneers, Clear Aligners, Teeth Whitening, and more. Swiss precision, natural results.',
}

const BASE_URL = 'https://www.luxurydental.ch'

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Digital Smile Design?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Digital Smile Design is an advanced 3D digital planning process that lets you preview your perfect smile before any treatment begins, analysing facial proportions, lip dynamics, and dental aesthetics.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do porcelain veneers last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Porcelain veneers typically last 10–20 years with proper care. They are crafted from high-quality ceramic and bonded to minimal tooth preparation for a natural, durable result.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are clear aligners as effective as traditional braces?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Clear aligners are highly effective for mild to moderate orthodontic corrections and offer the advantages of being removable and virtually invisible.',
      },
    },
    {
      '@type': 'Question',
      name: 'How many shades whiter can professional teeth whitening achieve?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional in-office whitening at Luxury Dental can achieve up to 8 shades brighter in a single session, with clinically supervised results superior to over-the-counter alternatives.',
      },
    },
  ],
}

const servicesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Dental Treatments — Luxury Dental Paradiso Lugano',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: { '@type': 'MedicalProcedure', name: 'Digital Smile Design', url: `${BASE_URL}/en/dental` },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: { '@type': 'MedicalProcedure', name: 'Porcelain Veneers', url: `${BASE_URL}/en/dental` },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: { '@type': 'MedicalProcedure', name: 'Clear Aligners', url: `${BASE_URL}/en/dental` },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: { '@type': 'MedicalProcedure', name: 'Teeth Whitening', url: `${BASE_URL}/en/dental` },
    },
    {
      '@type': 'ListItem',
      position: 5,
      item: { '@type': 'MedicalProcedure', name: 'Sleep Dentistry', url: `${BASE_URL}/en/dental` },
    },
  ],
}

export default function DentalPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesJsonLd) }}
      />
      <Navbar />
      <main>
        <PageHero
          eyebrow="Dental Excellence"
          title="Precision Dental"
          titleAccent="Treatments"
          subtitle="From a single restoration to a complete smile transformation — every treatment is designed with clinical mastery and artistic attention to detail."
        />
        <DentalContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
