import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppButton from '@/components/floating/WhatsAppButton'
import PageHero from '@/components/ui/PageHero'
import SleepDentistryContent from './SleepDentistryContent'

export const metadata: Metadata = {
  title: 'Sleep Dentistry — Conscious Sedation | Lugano',
  description:
    'Receive complete dental care in total comfort with conscious sedation at Luxury Dental Paradiso, Lugano. Ideal for anxious patients and complex multi-treatment sessions.',
  keywords:
    'sleep dentistry Lugano, conscious sedation dentist Switzerland, anxious patient dental Lugano, sedation dentistry Ticino',
  alternates: {
    canonical: 'https://www.luxurydental.ch/en/sleep-dentistry',
  },
}

export default function SleepDentistryPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Sedazione Cosciente"
          title="Dentistry Without"
          titleAccent="Anxiety"
          subtitle="Receive complete dental care in a state of deep calm. Conscious sedation makes even the most complex treatments feel effortless — you stay comfortable, safe, and in control."
        />
        <SleepDentistryContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
