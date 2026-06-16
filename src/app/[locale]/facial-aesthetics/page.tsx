import type { Metadata } from 'next'
import { Navbar, Footer } from '@/components/layout'
import { WhatsAppButton } from '@/components/floating'
import { PageHero } from '@/components/ui'
import FacialContent from './FacialContent'

export const metadata: Metadata = {
  title: 'Facial Aesthetics',
  description:
    'Discover premium facial aesthetics treatments in Lugano: skin rejuvenation, facial harmony, anti-aging, and hydration therapies. Natural beauty enhanced with Swiss precision.',
}

const facialFaqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What facial aesthetic treatments do you offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer deep facial cleansing, skin rejuvenation, facial harmony, anti-aging treatments, and hydration therapies. Each protocol is individually designed based on your skin type, facial structure, and aesthetic goals.',
      },
    },
    {
      '@type': 'Question',
      name: 'Are facial treatments painful?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The vast majority of our facial treatments are minimally invasive and performed with topical anaesthetic when needed. Most patients describe the experience as comfortable and relaxing.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long do facial treatment results last?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Results vary by treatment: hydration therapies provide immediate benefits that improve over time, while treatments such as facial harmony can last 12 to 18 months.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much recovery time do I need after facial treatments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most facial treatments require no downtime. You can return to normal activities immediately. More intensive treatments may result in mild redness for 24 to 48 hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'How often should I repeat facial treatments?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The frequency depends on the treatment and your goals. We generally recommend an assessment every 3 to 6 months for maintenance treatments.',
      },
    },
    {
      '@type': 'Question',
      name: 'From what age can facial aesthetic treatments be performed?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'There is no strict minimum age; the indication depends on each patient\'s individual needs. We perform a full assessment at the initial consultation to determine the most suitable protocol.',
      },
    },
  ],
}

export default function FacialAestheticsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(facialFaqJsonLd) }}
      />
      <Navbar />
      <main>
        <PageHero
          eyebrow="Facial Aesthetics"
          title="Facial Harmony &"
          titleAccent="Rejuvenation"
          subtitle="Holistic facial aesthetics rooted in natural beauty principles. Every treatment is tailored to enhance what is uniquely yours."
        />
        <FacialContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
