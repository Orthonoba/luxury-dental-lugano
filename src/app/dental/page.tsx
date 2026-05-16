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

export default function DentalPage() {
  return (
    <>
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
