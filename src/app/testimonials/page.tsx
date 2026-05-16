import type { Metadata } from 'next'
import { Navbar, Footer } from '@/components/layout'
import { WhatsAppButton } from '@/components/floating'
import { PageHero } from '@/components/ui'
import TestimonialsContent from './TestimonialsContent'

export const metadata: Metadata = {
  title: 'Patient Stories',
  description:
    'Read what our patients say about their experience at Luxury Dental Paradiso in Lugano. Real stories of smile transformations and exceptional care.',
}

export default function TestimonialsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Patient Stories"
          title="Lives Changed,"
          titleAccent="Smiles Transformed"
          subtitle="The most meaningful measure of our work is the confidence and joy our patients carry with them long after their treatment is complete."
        />
        <TestimonialsContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
