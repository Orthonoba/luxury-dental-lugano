import type { Metadata } from 'next'
import { Navbar, Footer } from '@/components/layout'
import { WhatsAppButton } from '@/components/floating'
import { PageHero } from '@/components/ui'
import DentalBookingForm from '@/components/forms/DentalBookingForm'

export const metadata: Metadata = {
  title: 'Reservar Cita — Odontología Avanzada | Luxury Dental Lugano',
  description:
    'Reserve su cita de odontología en Luxury Dental Paradiso, Lugano. Ortodoncia invisible, diseño de sonrisa, implantes, carillas, blanqueamiento y más. Precisión suiza.',
}

export default function DentalBookingPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Reserve su Cita"
          title="Odontología"
          titleAccent="Avanzada"
          subtitle="Seleccione su especialidad, fecha y horario preferidos. Le confirmaremos la disponibilidad en las próximas 24 horas."
        />
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <DentalBookingForm />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
