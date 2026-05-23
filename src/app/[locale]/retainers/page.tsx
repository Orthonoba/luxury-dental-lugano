import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/floating/WhatsAppButton'
import PageHero from '@/components/ui/PageHero'
import RetainersContent from './RetainersContent'

export const metadata: Metadata = {
  title: 'Orthodontic Retainers — Essix & Fixed | Lugano',
  description:
    'Custom Essix and fixed retainers to maintain your perfect smile after orthodontic treatment at Luxury Dental Paradiso, Lugano, Switzerland.',
  keywords:
    'retainers Lugano, Essix retainer Switzerland, fixed retainer Ticino, orthodontic retainer Lugano, post-aligner retainer',
  alternates: {
    canonical: 'https://www.luxurydental.ch/en/retainers',
  },
}

export default function RetainersPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Post-Orthodontic Care"
          title="Essix"
          titleAccent="Retainers"
          subtitle="Protecting your orthodontic investment for years to come. Our custom retainers are crafted with the same precision as your aligner treatment — discrete, comfortable, and effective."
        />
        <RetainersContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
