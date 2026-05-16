import { Navbar, Footer } from '@/components/layout'
import { HeroSection } from '@/components/hero'
import {
  PhilosophySection,
  DentalTreatments,
  FacialAesthetics,
  TeamSection,
  TestimonialsSection,
  ContactSection,
} from '@/components/sections'
import { BeforeAfterGallery } from '@/components/gallery'
import { WhatsAppButton } from '@/components/floating'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <PhilosophySection />
        <DentalTreatments />
        <FacialAesthetics />
        <BeforeAfterGallery />
        <TeamSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
