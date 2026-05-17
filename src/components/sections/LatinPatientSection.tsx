'use client'

import { motion } from 'framer-motion'
import { fadeUp, scaleIn, stagger, floatSlow, LUXURY_EASE } from '@/lib/animations'
import { SITE_CONFIG } from '@/config/site'

const features = [
  { icon: '🇨🇭', text: 'Clínica certificada en Suiza' },
  { icon: '💬', text: 'Atención en Español' },
  { icon: '✈️', text: 'Pacientes internacionales' },
  { icon: '⭐', text: 'Resultados de 5 estrellas' },
]

export default function LatinPatientSection() {
  const whatsappUrl = `https://wa.me/41916826805?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20informaci%C3%B3n%20sobre%20tratamientos%20dentales%20en%20Luxury%20Dental%20Paradiso%2C%20Lugano.`

  return (
    <section className="py-32 bg-beige overflow-hidden relative" aria-label="Pacientes internacionales">
      {/* Decorative ambient elements */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-20 items-center">

          {/* LEFT — Text content (3/5) */}
          <motion.div
            className="lg:col-span-3"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Eyebrow */}
            <motion.span
              variants={fadeUp}
              className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
            >
              Pacientes Internacionales
            </motion.span>

            {/* Headline */}
            <motion.h2
              variants={fadeUp}
              className="font-display font-bold text-luxury-black leading-[1.06] tracking-tight mb-4"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
            >
              Experiencia Dental
              <span className="block text-olive">de Lujo en Suiza</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="text-luxury-black/50 text-lg font-display italic mb-6"
            >
              Transformaciones premium en Lugano, Paradiso
            </motion.p>

            {/* Body text */}
            <motion.p
              variants={fadeUp}
              className="text-luxury-black/55 text-base leading-relaxed mb-4 max-w-lg"
            >
              Atención personalizada en español, tratamientos de vanguardia y la precisión suiza que mereces. Tu viaje a la sonrisa perfecta comienza aquí.
            </motion.p>
            <motion.p
              variants={fadeUp}
              className="text-luxury-black/40 text-sm leading-relaxed mb-10 max-w-lg"
            >
              Contamos con un equipo bilingüe listo para guiarte desde tu país de origen hasta la clínica. Coordinamos todo — desde la consulta hasta el tratamiento completo.
            </motion.p>

            {/* Feature pills */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2.5 mb-10">
              {features.map(({ icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-beige-light rounded-full text-luxury-black/60 text-[11px] tracking-wide shadow-sm"
                >
                  <span className="text-sm">{icon}</span>
                  {text}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start gap-3">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-2xl hover:shadow-olive/25 hover:-translate-y-0.5"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Escríbenos por WhatsApp
              </a>
              <a
                href="/contact"
                className="inline-flex items-center px-8 py-4 border border-olive/35 text-olive text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive hover:text-white hover:border-olive transition-all duration-300"
              >
                Reservar Consulta
              </a>
            </motion.div>
          </motion.div>

          {/* RIGHT — Decorative visual (2/5) */}
          <div className="lg:col-span-2 relative hidden lg:flex items-center justify-center min-h-[480px]">
            {/* Large ambient circle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: LUXURY_EASE }}
              className="absolute w-72 h-72 rounded-full bg-linear-to-br from-gold/10 to-olive/8 border border-gold/15"
            />

            {/* Inner circle with gold ring */}
            <motion.div
              animate={floatSlow}
              className="relative z-10 w-52 h-52 rounded-full bg-white/80 border-2 border-gold/20 shadow-2xl shadow-olive/10 flex items-center justify-center"
            >
              <div className="text-center">
                <p className="font-display font-bold text-luxury-black text-5xl leading-none mb-1">
                  5★
                </p>
                <p className="text-luxury-black/40 text-[10px] tracking-[0.25em] uppercase font-medium">
                  Google Reviews
                </p>
              </div>
            </motion.div>

            {/* Floating cards */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="absolute top-8 right-4 bg-white rounded-2xl shadow-xl shadow-olive/10 px-4 py-3 border border-beige"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-gold font-semibold mb-0.5">
                Idioma
              </p>
              <p className="text-luxury-black text-sm font-semibold">🇪🇸 Español</p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-12 left-2 bg-olive rounded-2xl shadow-xl shadow-olive/20 px-4 py-3"
            >
              <p className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-semibold mb-0.5">
                Ubicación
              </p>
              <p className="text-white text-sm font-semibold">📍 Lugano, Suiza</p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="absolute bottom-32 right-0 bg-white rounded-2xl shadow-xl shadow-black/5 px-4 py-3 border border-beige"
            >
              <p className="text-[10px] tracking-[0.15em] uppercase text-luxury-black/40 font-medium mb-0.5">
                Atención
              </p>
              <p className="text-luxury-black text-xs font-semibold leading-snug max-w-[140px]">
                Personalizada &<br />en tu idioma
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
