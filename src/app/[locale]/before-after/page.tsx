import type { Metadata } from 'next'
import { Navbar, Footer } from '@/components/layout'
import { WhatsAppButton } from '@/components/floating'
import { PageHero } from '@/components/ui'
import BeforeAfterContent from './BeforeAfterContent'

export const metadata: Metadata = {
  title: 'Before & After',
  description:
    'Explore real smile transformations at Luxury Dental Paradiso in Lugano. See before and after results for Digital Smile Design, Veneers, Clear Aligners, and more.',
}

export default function BeforeAfterPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Transformations"
          title="Real Results,"
          titleAccent="Real People"
          subtitle="Every smile you see here is the result of personalised care, clinical precision, and an unwavering commitment to natural beauty."
        />
        <BeforeAfterContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
