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
      name: 'What is Digital Smile Design (DSD)?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Digital Smile Design is an advanced methodology combining clinical photography, facial analysis, and specialist software to create a precise 3D preview of your new smile before any treatment begins. You can approve every detail before a single tooth is touched.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do porcelain veneers last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Porcelain veneers are a long-lasting aesthetic solution that can last 10 to 20 years with proper care. They offer exceptional longevity compared with other cosmetic dental options.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does treatment with clear aligners take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Duration varies according to case complexity, but generally ranges from 6 to 18 months. During the diagnostic consultation we perform a full analysis and present a digital simulation of the final result.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does professional teeth whitening damage enamel?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Clinically supervised professional whitening uses controlled, safe concentrations of peroxide that do not damage enamel. It is significantly safer and more effective than over-the-counter whitening products.',
      },
    },
    {
      '@type': 'Question',
      name: 'What guarantees do you offer on dental results?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We include post-treatment follow-up with all procedures and offer a satisfaction guarantee. If the outcome does not meet the expectations agreed upon during digital planning, we revise it at no additional cost.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is full-mouth rehabilitation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Full-mouth rehabilitation is a comprehensive approach that simultaneously restores chewing function, dental aesthetics, and general oral health. It is indicated when multiple teeth are affected, there is severe enamel wear, or bite problems requiring global reconstruction.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does full-mouth rehabilitation take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A full rehabilitation treatment can take 3 to 12 months, including diagnostic, provisional, and definitive phases. We present a detailed treatment plan with a timeline at the initial consultation.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do you have options for patients with dental anxiety?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. We offer conscious sedation for all rehabilitative procedures, allowing extensive treatments to be completed in greater comfort and with fewer appointments.',
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
