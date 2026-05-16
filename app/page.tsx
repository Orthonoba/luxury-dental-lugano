import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import PhilosophySection from '@/components/PhilosophySection'
import DentalTreatments from '@/components/DentalTreatments'
import FacialAesthetics from '@/components/FacialAesthetics'
import BeforeAfterGallery from '@/components/BeforeAfterGallery'
import TeamSection from '@/components/TeamSection'
import TestimonialsSection from '@/components/TestimonialsSection'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

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
