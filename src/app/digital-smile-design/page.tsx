import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/floating/WhatsAppButton'
import PageHero from '@/components/ui/PageHero'
import DigitalSmileDesignContent from './DigitalSmileDesignContent'

export const metadata: Metadata = {
  title: 'Digital Smile Design — DSD | Lugano Switzerland',
  description:
    'See your new smile before treatment begins. Digital Smile Design (DSD) at Luxury Dental Paradiso, Lugano creates a 3D digital preview of your transformation — crafted around your face, proportions, and personality.',
  keywords:
    'Digital Smile Design Lugano, DSD Switzerland, smile design dentist Lugano, smile makeover Ticino, 3D smile preview, cosmetic dentist Switzerland',
  alternates: {
    canonical: 'https://www.luxurydental.ch/en/digital-smile-design',
  },
}

export default function DigitalSmileDesignPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Signature Treatment"
          title="Your New Smile"
          titleAccent="Before We Begin"
          subtitle="The most advanced smile planning methodology in modern dentistry. We design your transformation digitally — so you can approve every detail before a single tooth is touched."
        />
        <DigitalSmileDesignContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
