import type { Metadata } from 'next'
import { Navbar, Footer } from '@/components/layout'
import { WhatsAppButton } from '@/components/floating'
import { PageHero } from '@/components/ui'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Discover the philosophy, story, and mission behind Luxury Dental Paradiso in Lugano, Switzerland. Swiss precision, artistic excellence, and a dedicated team for your smile.',
}

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Our Story"
          title="Where Precision"
          titleAccent="Meets Beauty"
          subtitle="A luxury dental and facial aesthetics clinic born from the belief that clinical excellence and artistic vision must never be separated."
        />
        <AboutContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
