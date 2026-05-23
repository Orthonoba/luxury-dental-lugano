'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, stagger, scaleIn, fadeIn, floatAnimation, floatSlow, blurIn, LUXURY_EASE } from '@/lib/animations'
import { ImagePlaceholder } from '@/components/ui'

const WHATSAPP_INFO = `https://wa.me/41765259395?text=Hola%20Jos%C3%A9%20Gregorio%2C%20quiero%20informaci%C3%B3n%20sobre%20una%20consulta%20dental%20en%20Luxury%20Dental%20Paradiso.`
const WHATSAPP_CONSULT = `https://wa.me/41765259395?text=Hola%20Jos%C3%A9%20Gregorio%2C%20me%20gustar%C3%ADa%20agendar%20una%20consulta%20gratuita%20en%20Luxury%20Dental%20Paradiso.`

// ─── Shared helpers ────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ─── Section 1: Hero ────────────────────────────────────────────────────────

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient — dark luxury */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0a0d06] via-[#141a0a] to-[#1e2810]" />

      {/* Ambient floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={floatAnimation}
          className="absolute top-1/4 -left-24 w-[500px] h-[500px] rounded-full bg-olive/8 blur-[130px]"
        />
        <motion.div
          animate={{ y: [0, 12, 0], transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
          className="absolute bottom-1/4 -right-16 w-[400px] h-[400px] rounded-full bg-gold/7 blur-[110px]"
        />
        <motion.div
          animate={{ y: [0, -8, 0], transition: { duration: 10, repeat: Infinity, ease: 'easeInOut' } }}
          className="absolute top-3/4 left-1/3 w-[300px] h-[300px] rounded-full bg-beige/4 blur-[90px]"
        />
      </div>

      {/* Subtle editorial grid */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,169,107,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,107,0.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-36 pb-28">
        <div className="lg:grid lg:grid-cols-5 lg:gap-16 lg:items-center">

          {/* Text — 3/5 */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-gold/25 bg-gold/8 mb-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-medium">
                Pacientes Internacionales · Lugano, Suiza
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={blurIn}
              className="font-display font-bold text-white leading-[1.04] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.8rem, 6.5vw, 5.25rem)' }}
            >
              Tu Nueva Sonrisa
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #C8A96B 0%, #E8DCCB 50%, #C8A96B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                en Suiza
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="max-w-xl mx-auto lg:mx-0 text-white/50 text-lg leading-relaxed mb-12"
            >
              Atención personalizada en español para pacientes internacionales en una clínica dental premium en Lugano, Suiza. Precisión suiza. Calidez latina.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16 lg:mb-0"
            >
              <a
                href={WHATSAPP_CONSULT}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-olive text-white text-[11px] tracking-[0.22em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-2xl hover:shadow-olive/35 hover:-translate-y-0.5"
              >
                <WhatsAppIcon size={14} />
                Agenda una Consulta Gratuita
              </a>
              <a
                href={WHATSAPP_INFO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 border border-white/15 text-white/75 text-[11px] tracking-[0.22em] uppercase font-medium rounded-full hover:bg-white/8 hover:border-white/30 hover:text-white transition-all duration-300"
              >
                Habla con Nosotros
              </a>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              variants={fadeUp}
              className="hidden lg:grid grid-cols-3 gap-6 max-w-sm mt-16 border-t border-white/8 pt-10"
            >
              {[
                { value: '5★', label: 'Google Reviews' },
                { value: '15+', label: 'Años de Excelencia' },
                { value: '100%', label: 'Atención en Español' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-bold text-gold leading-none mb-1.5">{s.value}</p>
                  <p className="text-white/35 text-[9px] tracking-[0.2em] uppercase">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image — 2/5 */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: LUXURY_EASE }}
            className="hidden lg:block lg:col-span-2 relative"
          >
            <div className="relative">
              <div className="absolute -inset-3 border border-gold/15 rounded-3xl" />
              <div className="absolute -inset-6 border border-white/5 rounded-3xl" />
              <ImagePlaceholder
                aspectRatio="aspect-[3/4]"
                label="Clínica Premium Lugano"
                className="rounded-2xl"
              />
              {/* Floating card — Spanish flag */}
              <motion.div
                animate={floatSlow}
                className="absolute -bottom-8 -left-8 bg-luxury-black/90 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4"
              >
                <p className="text-white/40 text-[9px] tracking-[0.2em] uppercase mb-1">Atención</p>
                <p className="font-display text-lg font-bold text-white leading-none">🇪🇸 En Español</p>
              </motion.div>
              {/* Gold accent */}
              <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-gold/20 border border-gold/40" />
            </div>
          </motion.div>
        </div>

        {/* Mobile stats */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="lg:hidden grid grid-cols-3 gap-4 max-w-xl mx-auto border-t border-white/8 pt-10 mt-14 text-center"
        >
          {[
            { value: '5★', label: 'Google Reviews' },
            { value: '15+', label: 'Años' },
            { value: '100%', label: 'En Español' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-display text-xl font-bold text-gold leading-none mb-1">{s.value}</p>
              <p className="text-white/35 text-[9px] tracking-[0.2em] uppercase">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 pointer-events-none"
      >
        <span className="text-white/25 text-[9px] tracking-[0.4em] uppercase">Descubre</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-10 bg-linear-to-b from-gold/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}

// ─── Section 2: José Gregorio ───────────────────────────────────────────────

const credentials = [
  { icon: '🦷', label: 'Ortotécnico Dental' },
  { icon: '🧼', label: 'Higienista Oral' },
  { icon: '🛡️', label: 'Especialista en Protectores Bucales' },
  { icon: '✨', label: 'Estética Dental' },
  { icon: '📱', label: 'Marketing Digital Dental' },
]

function JoseGregorioSection() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-28 items-center">

          {/* Portrait placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: LUXURY_EASE }}
            className="relative"
          >
            {/* Decorative corner frame */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-gold/25 rounded-tl-2xl" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-olive/20 rounded-br-2xl" />

            <ImagePlaceholder
              aspectRatio="aspect-[4/5]"
              label="José Gregorio Rodriguez"
              className="rounded-3xl"
            />

            {/* Floating role badge */}
            <motion.div
              animate={floatSlow}
              className="absolute -right-6 top-1/3 bg-luxury-black text-white rounded-2xl px-5 py-4 shadow-2xl shadow-black/20 border border-white/5 max-w-[180px]"
            >
              <p className="text-gold text-[9px] tracking-[0.2em] uppercase font-semibold mb-1">Coordinador</p>
              <p className="text-white text-sm font-semibold leading-snug">Pacientes Internacionales</p>
            </motion.div>

            {/* Lugano badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, ease: LUXURY_EASE }}
              className="absolute -left-6 bottom-12 bg-beige border border-beige-light rounded-2xl px-4 py-3 shadow-lg"
            >
              <p className="text-luxury-black/50 text-[9px] tracking-[0.2em] uppercase mb-0.5">Ubicación</p>
              <p className="text-luxury-black font-semibold text-sm">📍 Lugano, Suiza</p>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.span
              variants={fadeUp}
              className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
            >
              Tu Punto de Contacto
            </motion.span>

            <motion.h2
              variants={blurIn}
              className="font-display font-bold text-luxury-black leading-[1.06] tracking-tight mb-3"
              style={{ fontSize: 'clamp(2rem, 4.5vw, 3.25rem)' }}
            >
              José Gregorio
              <span className="block text-olive italic font-medium">Rodriguez</span>
            </motion.h2>

            <motion.p
              variants={fadeUp}
              className="text-gold text-[11px] tracking-[0.25em] uppercase font-semibold mb-8"
            >
              Especialista en Atención Internacional
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-luxury-black/55 text-lg leading-relaxed mb-6"
            >
              Soy tu guía personal en el camino hacia tu sonrisa de ensueño. Con formación especializada y una profunda pasión por la estética dental, estoy aquí para acompañarte en cada etapa de tu transformación.
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="text-luxury-black/40 text-base leading-relaxed mb-10"
            >
              Entiendo las dudas y expectativas de los pacientes que viajan desde el extranjero. Por eso ofrezco atención totalmente personalizada, resolviendo tus preguntas antes, durante y después del tratamiento.
            </motion.p>

            {/* Credentials */}
            <motion.div variants={fadeUp} className="space-y-2.5 mb-10">
              {credentials.map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <span className="text-lg">{icon}</span>
                  <span className="text-luxury-black/65 text-sm font-medium">{label}</span>
                </div>
              ))}
            </motion.div>

            {/* Personal CTA */}
            <motion.div variants={fadeUp}>
              <a
                href={WHATSAPP_INFO}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-olive text-white text-[11px] tracking-[0.22em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-xl hover:shadow-olive/25 hover:-translate-y-0.5"
              >
                <WhatsAppIcon />
                Escríbeme Directamente
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Section 3: International Experience ────────────────────────────────────

const experienceSteps = [
  {
    number: '01',
    title: 'Consulta Inicial Gratuita',
    description:
      'Comienza con una consulta sin compromiso vía WhatsApp o videollamada. Te orientamos sobre los tratamientos ideales para ti y respondemos todas tus preguntas.',
    icon: '💬',
  },
  {
    number: '02',
    title: 'Plan de Tratamiento Personalizado',
    description:
      'Diseñamos un plan detallado adaptado a tus necesidades estéticas y presupuesto. Incluimos cronograma, costos y opciones de hospedaje en Lugano.',
    icon: '📋',
  },
  {
    number: '03',
    title: 'Experiencia Premium en Lugano',
    description:
      'Llega a nuestra clínica en el corazón de Paradiso, Lugano. Te recibimos con atención bilingüe, tecnología de vanguardia y un ambiente de lujo suizo.',
    icon: '🏔️',
  },
  {
    number: '04',
    title: 'Seguimiento Internacional',
    description:
      'El cuidado no termina cuando regresas a casa. Realizamos seguimiento personalizado y estamos disponibles para consultas de mantenimiento remotas.',
    icon: '✈️',
  },
]

function InternationalExperienceSection() {
  return (
    <section className="py-32 bg-beige-light overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
          >
            Tu Experiencia Internacional
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: LUXURY_EASE }}
            className="font-display font-bold text-luxury-black leading-[1.06] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
          >
            Atención Personalizada
            <span className="block text-olive italic font-medium">de Principio a Fin</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-luxury-black/45 text-base leading-relaxed"
          >
            Coordinamos cada detalle de tu visita a Lugano para que te concentres únicamente en tu transformación.
          </motion.p>
        </div>

        {/* Steps grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experienceSteps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: LUXURY_EASE }}
              className="group bg-white rounded-3xl p-8 hover:shadow-2xl hover:shadow-olive/8 transition-all duration-500 hover:-translate-y-1"
            >
              {/* Number + Icon */}
              <div className="flex items-start justify-between mb-6">
                <span className="font-display text-5xl font-bold text-beige group-hover:text-gold/20 transition-colors duration-400 leading-none">
                  {step.number}
                </span>
                <span className="text-2xl">{step.icon}</span>
              </div>
              <h3 className="font-display font-bold text-luxury-black text-lg mb-3 group-hover:text-olive transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-luxury-black/45 text-sm leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Language & support badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-3 mt-16"
        >
          {[
            '🇪🇸 Atención en Español',
            '🇮🇹 Italiano',
            '🇬🇧 English',
            '💬 WhatsApp 24h',
            '📹 Videollamada',
            '✈️ Coordinación de Viaje',
          ].map((badge) => (
            <span
              key={badge}
              className="px-4 py-2 bg-white border border-beige rounded-full text-luxury-black/55 text-[11px] tracking-wide font-medium shadow-sm"
            >
              {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 4: Video Testimonials ──────────────────────────────────────────

const videoCards = [
  { label: 'Diseño de Sonrisa', subtitle: 'Paciente de México', duration: '2:34' },
  { label: 'Carillas Dentales', subtitle: 'Paciente de Colombia', duration: '1:58' },
  { label: 'Transformación Completa', subtitle: 'Paciente de Argentina', duration: '3:12' },
  { label: 'Estética Facial', subtitle: 'Paciente de Venezuela', duration: '2:07' },
]

function VideoTestimonialsSection() {
  const [active, setActive] = useState(0)

  return (
    <section className="py-32 bg-luxury-black overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-olive/5 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
          >
            Historias Reales
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: LUXURY_EASE }}
            className="font-display font-bold text-white leading-[1.06]"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
          >
            Transformaciones que
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #C8A96B 0%, #E8DCCB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Hablan por Sí Solas
            </span>
          </motion.h2>
        </div>

        {/* Main featured video */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto mb-8 group"
        >
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-white/4 border border-white/8 backdrop-blur-sm">
            {/* Video placeholder with cinematic style */}
            <div className="absolute inset-0 bg-linear-to-br from-luxury-dark via-luxury-black to-[#1a2010] flex items-center justify-center">
              <div className="text-center">
                {/* Play button */}
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  className="w-20 h-20 rounded-full bg-olive/90 border-2 border-gold/30 flex items-center justify-center mx-auto mb-6 cursor-pointer shadow-2xl shadow-olive/30 hover:bg-olive transition-colors duration-300"
                >
                  <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 ml-1">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
                <p className="text-white/50 text-[10px] tracking-[0.3em] uppercase mb-1">
                  {videoCards[active].label}
                </p>
                <p className="text-white/25 text-xs">{videoCards[active].subtitle}</p>
              </div>
            </div>
            {/* Duration badge */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-luxury-black/70 backdrop-blur-md rounded-lg border border-white/8">
              <span className="text-white/60 text-[10px] tracking-wider font-medium">{videoCards[active].duration}</span>
            </div>
            {/* Decorative corner */}
            <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />
          </div>
        </motion.div>

        {/* Thumbnail carousel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {videoCards.map((card, i) => (
            <motion.button
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActive(i)}
              className={`relative aspect-video rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
                active === i
                  ? 'border-gold/50 scale-[1.02] shadow-lg shadow-gold/10'
                  : 'border-white/8 hover:border-white/20 hover:scale-[1.02]'
              }`}
            >
              <div className="absolute inset-0 bg-luxury-dark flex items-center justify-center">
                <div className="text-center px-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2 transition-colors ${active === i ? 'bg-gold/80' : 'bg-white/10'}`}>
                    <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4 ml-0.5">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <p className="text-white/50 text-[9px] tracking-[0.15em] uppercase leading-snug">{card.label}</p>
                </div>
              </div>
              {active === i && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Google Rating */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center gap-2 mt-12"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" fill="#C8A96B" className="w-4 h-4">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <span className="text-white/30 text-[11px] tracking-[0.2em]">5.0 · Google Reviews · 8 valoraciones</span>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 5: Free Consultation CTA ───────────────────────────────────────

function FreeCTASection() {
  return (
    <section className="py-32 bg-beige overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/15 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/10 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-olive/6 blur-[120px]" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gold/6 blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
        >
          Sin Compromiso · Sin Costo
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: LUXURY_EASE }}
          className="font-display font-bold text-luxury-black leading-[1.06] tracking-tight mb-6"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4rem)' }}
        >
          Agenda tu Consulta
          <span className="block text-olive italic font-medium">Gratuita en Lugano</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-luxury-black/50 text-lg leading-relaxed mb-4 max-w-2xl mx-auto"
        >
          Da el primer paso hacia la sonrisa que siempre soñaste. José Gregorio te atiende en español, coordina tu visita y resuelve cada duda antes de que salgas de tu país.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
          className="text-luxury-black/30 text-sm mb-12"
        >
          Via Riva Paradiso 4 · 6900 Lugano, Suiza · info@luxurydental.ch
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href={WHATSAPP_CONSULT}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-10 py-5 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-2xl hover:shadow-olive/30 hover:-translate-y-0.5"
          >
            <WhatsAppIcon size={15} />
            WhatsApp con José Gregorio
          </a>
          <a
            href="/contact"
            className="inline-flex items-center px-10 py-5 border border-olive/35 text-olive text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive hover:text-white transition-all duration-300"
          >
            Reservar Consulta Online
          </a>
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-6 text-luxury-black/30 text-[11px] tracking-wide"
        >
          <span>✓ Consulta 100% gratuita</span>
          <span>✓ Sin compromiso</span>
          <span>✓ Respuesta en menos de 24h</span>
          <span>✓ Atención en español</span>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Section 6: Lugano Lifestyle ────────────────────────────────────────────

const lifestyleItems = [
  {
    label: 'Paradiso, Lugano',
    description: 'Nuestra clínica se encuentra en el barrio más exclusivo de Lugano, a orillas del lago. Un entorno que invita a la calma y al bienestar.',
    aspectRatio: 'aspect-[4/5]',
  },
  {
    label: 'Lago di Lugano',
    description: 'La ciudad de Lugano combina la elegancia italiana con la precisión suiza. Un destino único para tu tratamiento y descanso.',
    aspectRatio: 'aspect-[3/4]',
  },
  {
    label: 'Clínica Premium',
    description: 'Tecnología de última generación en un ambiente cuidadosamente diseñado para tu comodidad y bienestar durante el tratamiento.',
    aspectRatio: 'aspect-[4/5]',
  },
]

function LuganoLifestyleSection() {
  return (
    <section className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="grid lg:grid-cols-2 gap-16 items-end mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: LUXURY_EASE }}
          >
            <span className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6">
              El Destino
            </span>
            <h2
              className="font-display font-bold text-luxury-black leading-[1.06] tracking-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)' }}
            >
              Lugano —
              <span className="block text-olive italic font-medium">Una Experiencia Única</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="text-luxury-black/45 text-base leading-relaxed"
          >
            Combina tu tratamiento dental con la experiencia de vivir Suiza. Lugano ofrece una calidad de vida extraordinaria: gastronomía italiana, naturaleza alpina, seguridad y elegancia.
          </motion.p>
        </div>

        {/* Asymmetric image grid */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {lifestyleItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: LUXURY_EASE }}
              className={`group ${i === 1 ? 'md:mt-12' : ''}`}
            >
              <div className="overflow-hidden rounded-3xl transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-olive/8 group-hover:scale-[1.01]">
                <ImagePlaceholder
                  aspectRatio={item.aspectRatio}
                  label={item.label}
                />
              </div>
              <div className="mt-5">
                <p className="font-display font-semibold text-luxury-black text-lg mb-2 group-hover:text-olive transition-colors duration-300">
                  {item.label}
                </p>
                <p className="text-luxury-black/40 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Address CTA block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20 p-10 rounded-3xl bg-beige-light border border-beige flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-medium mb-2">Encuéntranos</p>
            <p className="font-display font-bold text-luxury-black text-xl mb-1">Luxury Dental Paradiso</p>
            <p className="text-luxury-black/50 text-sm">Via Riva Paradiso 4 · 6900 Paradiso / Lugano · Suiza</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href={WHATSAPP_CONSULT}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-olive text-white text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-lg hover:shadow-olive/25"
            >
              <WhatsAppIcon />
              Escribir por WhatsApp
            </a>
            <a
              href="mailto:info@luxurydental.ch"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-luxury-black/20 text-luxury-black/60 text-[10px] tracking-[0.2em] uppercase font-medium rounded-full hover:border-olive hover:text-olive transition-all duration-300"
            >
              Enviar Email
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// ─── Page composition ───────────────────────────────────────────────────────

export default function InternationalPatientsContent() {
  return (
    <>
      <HeroSection />
      <JoseGregorioSection />
      <InternationalExperienceSection />
      <VideoTestimonialsSection />
      <FreeCTASection />
      <LuganoLifestyleSection />
    </>
  )
}
