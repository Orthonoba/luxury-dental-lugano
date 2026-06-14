import { Navbar, Footer } from '@/components/layout'
import { HeroSection } from '@/components/hero'
import {
  PhilosophySection,
  DentalTreatments,
  FacialAesthetics,
  BookingSpecialties,
  TeamSection,
  TestimonialsSection,
  LatinPatientSection,
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
        <BookingSpecialties />
        <BeforeAfterGallery />
        <TeamSection />
        <TestimonialsSection />
        <LatinPatientSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
