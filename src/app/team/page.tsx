import type { Metadata } from 'next'
import { Navbar, Footer } from '@/components/layout'
import { WhatsAppButton } from '@/components/floating'
import { PageHero } from '@/components/ui'
import TeamContent from './TeamContent'

export const metadata: Metadata = {
  title: 'Our Team',
  description:
    'Meet the specialists behind Luxury Dental Paradiso in Lugano. Dra. Andrea Calandrino, Dr. Samperi Francesco, and Gaspare Ingoglia — a team dedicated to your smile and well-being.',
}

export default function TeamPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Our Specialists"
          title="The Team Behind"
          titleAccent="Your Smile"
          subtitle="Exceptional expertise, genuine care, and an unwavering commitment to your aesthetic goals."
        />
        <TeamContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
