import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/floating/WhatsAppButton'
import PageHero from '@/components/ui/PageHero'
import STLGalleryContent from './STLGalleryContent'

export const metadata: Metadata = {
  title: '3D STL Design Gallery | Luxury Dental Paradiso',
  description:
    'Explore our gallery of precision-milled dental restorations. Each case begins as a 3D digital design — crafted with Swiss precision at Luxury Dental Paradiso, Lugano.',
  keywords:
    'dental 3D design Lugano, STL gallery dentist, precision restorations Switzerland, digital dentistry gallery Ticino, CAD/CAM dentistry Lugano',
  alternates: {
    canonical: 'https://www.luxurydental.ch/en/stl-gallery',
  },
}

export default function STLGalleryPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="3D Design Gallery"
          title="Precision"
          titleAccent="Crafted"
          subtitle="Every restoration begins as a digital masterpiece. Our 3D design gallery showcases the precision engineering behind the smiles we create — from initial scan to final placement."
        />
        <STLGalleryContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
