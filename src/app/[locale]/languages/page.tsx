import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/floating/WhatsAppButton'
import PageHero from '@/components/ui/PageHero'
import LanguagesContent from './LanguagesContent'

export const metadata: Metadata = {
  title: 'Multilingual Dental Care — EN, ES, IT, DE, FR | Lugano',
  description:
    'Luxury Dental Paradiso in Lugano serves patients in five languages: English, Spanish, Italian, German, and French. Premium dental and aesthetic care with no language barriers.',
  keywords:
    'English dentist Lugano, Spanish dentist Switzerland, multilingual dental clinic Lugano, international dentist Ticino, German dentist Lugano, French dentist Switzerland',
  alternates: {
    canonical: 'https://www.luxurydental.ch/en/languages',
  },
}

export default function LanguagesPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="We Speak Your Language"
          title="International"
          titleAccent="Care"
          subtitle="Our multilingual team serves patients from across Europe and Latin America in English, Spanish, Italian, German, and French — so you always feel at home in our clinic."
        />
        <LanguagesContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
