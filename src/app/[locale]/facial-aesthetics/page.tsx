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

export default function FacialAestheticsPage() {
  return (
    <>
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
