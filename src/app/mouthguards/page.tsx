import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/floating/WhatsAppButton'
import PageHero from '@/components/ui/PageHero'
import MouthguardsContent from './MouthguardsContent'

export const metadata: Metadata = {
  title: 'Custom Mouthguards & Bite Guards | Lugano',
  description:
    'Custom-fitted mouthguards and bite guards crafted at Luxury Dental Paradiso, Lugano. Protection for bruxism, sports, and TMJ — precision-made to your unique bite.',
  keywords:
    'mouthguard Lugano, bite guard Switzerland, bruxism guard Ticino, sports mouthguard Lugano, TMJ guard Switzerland, night guard dentist Lugano',
  alternates: {
    canonical: 'https://www.luxurydental.ch/en/mouthguards',
  },
}

export default function MouthguardsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Protective Dentistry"
          title="Custom Bite"
          titleAccent="Guards"
          subtitle="Precision-milled mouthguards that protect your teeth, jaw, and investment. Whether for bruxism, sport, or TMJ — each guard is crafted exclusively for your anatomy."
        />
        <MouthguardsContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
