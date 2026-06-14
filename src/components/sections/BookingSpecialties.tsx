'use client'

import { motion } from 'framer-motion'
import { Link } from '@/navigation'

const LUXURY_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: LUXURY_EASE } },
}
const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: LUXURY_EASE },
  }),
}

const dentalPills = ['Ortodoncia', 'Implantes', 'Carillas', 'Diseño de sonrisa', 'Endodoncia', 'Blanqueamiento']
const facialPills = ['Botox', 'Ácido hialurónico', 'Armonización', 'Perfilado mandibular', 'Bruxismo', 'Rejuvenecimiento']

export default function BookingSpecialties() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Heading */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.span
            variants={fadeUp}
            className="block text-[10px] tracking-[0.4em] uppercase font-medium text-gold mb-6"
          >
            Luxury Dental — Paradiso, Lugano
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-luxury-black leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
          >
            Reserve su{' '}
            <span className="text-olive italic font-medium">Cita</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mt-6">
            <div className="w-12 h-px bg-gold" />
            <div className="w-2 h-2 rounded-full bg-gold" />
            <div className="w-12 h-px bg-gold" />
          </motion.div>
          <motion.p
            variants={fadeUp}
            className="mt-6 text-luxury-black/50 text-sm max-w-md mx-auto leading-relaxed"
          >
            Dos especialidades de excelencia. Seleccione su área de interés y elija fecha y horario.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">

          {/* Dental card */}
          <motion.div
            custom={0}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -6, transition: { duration: 0.4, ease: LUXURY_EASE } }}
            className="group relative bg-luxury-black rounded-3xl p-10 lg:p-12 overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-olive/8 blur-[90px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <span className="block text-[10px] tracking-[0.4em] uppercase font-medium text-gold mb-5">
              Odontología Avanzada
            </span>
            <h3
              className="font-display font-bold text-white leading-tight mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
            >
              Sonrisa de<br />
              <span className="text-gold italic font-medium">precisión suiza</span>
            </h3>
            <p className="text-white/45 text-sm leading-relaxed mb-8 max-w-xs">
              Tratamientos dentales de vanguardia con tecnología digital y materiales de máxima calidad.
              Desde primera consulta hasta cirugía oral.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {dentalPills.map((pill) => (
                <span
                  key={pill}
                  className="text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full bg-white/6 text-white/45 border border-white/8 group-hover:border-gold/20 group-hover:text-gold/60 transition-colors duration-500"
                >
                  {pill}
                </span>
              ))}
            </div>

            <Link
              href="/book/dental"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-olive text-white text-[11px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light hover:shadow-lg hover:shadow-olive/30 transition-all duration-300"
            >
              Reservar cita dental
              <span className="text-xs opacity-70">→</span>
            </Link>
          </motion.div>

          {/* Facial card */}
          <motion.div
            custom={1}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -6, transition: { duration: 0.4, ease: LUXURY_EASE } }}
            className="group relative bg-beige rounded-3xl p-10 lg:p-12 overflow-hidden"
          >
            <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-gold/15 blur-[90px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            <span className="block text-[10px] tracking-[0.4em] uppercase font-medium text-olive mb-5">
              Estética Facial
            </span>
            <h3
              className="font-display font-bold text-luxury-black leading-tight mb-4"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.5rem)' }}
            >
              Belleza<br />
              <span className="text-olive italic font-medium">natural y armónica</span>
            </h3>
            <p className="text-luxury-black/55 text-sm leading-relaxed mb-8 max-w-xs">
              Tratamientos faciales que realzan su belleza natural. Resultados naturales, duraderos
              y adaptados a cada paciente.
            </p>

            <div className="flex flex-wrap gap-2 mb-10">
              {facialPills.map((pill) => (
                <span
                  key={pill}
                  className="text-[10px] tracking-wider uppercase px-3 py-1.5 rounded-full bg-luxury-black/6 text-luxury-black/45 border border-luxury-black/10 group-hover:border-olive/30 group-hover:text-olive transition-colors duration-500"
                >
                  {pill}
                </span>
              ))}
            </div>

            <Link
              href="/book/facial-aesthetics"
              className="inline-flex items-center gap-3 px-7 py-3.5 bg-olive text-white text-[11px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light hover:shadow-lg hover:shadow-olive/30 transition-all duration-300"
            >
              Reservar cita facial
              <span className="text-xs opacity-70">→</span>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
