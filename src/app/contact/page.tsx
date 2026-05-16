import type { Metadata } from 'next'
import { Navbar, Footer } from '@/components/layout'
import { WhatsAppButton } from '@/components/floating'
import { PageHero } from '@/components/ui'
import { ContactSection } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Visit Luxury Dental Paradiso at Via Riva Paradiso 4, Lugano, Switzerland. Book a consultation by phone, email, or WhatsApp. We look forward to welcoming you.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Get In Touch"
          title="Visit Us in"
          titleAccent="Lugano"
          subtitle="Our clinic is located in Paradiso — the most serene quarter of Lugano — overlooking the lake. We look forward to welcoming you."
        />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
