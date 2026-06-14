import type { Metadata } from 'next'
import { Navbar, Footer } from '@/components/layout'
import { WhatsAppButton } from '@/components/floating'
import { PageHero } from '@/components/ui'
import FacialBookingForm from '@/components/forms/FacialBookingForm'

export const metadata: Metadata = {
  title: 'Reservar Cita — Estética Facial | Luxury Dental Lugano',
  description:
    'Reserve su tratamiento de estética facial en Luxury Dental Paradiso, Lugano. Botox, ácido hialurónico, armonización facial, perfilado mandibular y más. Resultados naturales.',
}

export default function FacialBookingPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Reserve su Cita"
          title="Estética"
          titleAccent="Facial"
          subtitle="Seleccione el tratamiento, fecha y horario que mejor se adapten a usted. Confirmación en 24 horas."
        />
        <section className="py-24 bg-white">
          <div className="max-w-3xl mx-auto px-6 lg:px-8">
            <FacialBookingForm />
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}
