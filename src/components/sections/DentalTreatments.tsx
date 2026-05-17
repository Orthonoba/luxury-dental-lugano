'use client'

import { motion } from 'framer-motion'
import { stagger, fadeUp, LUXURY_EASE } from '@/lib/animations'

const treatments = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
      </svg>
    ),
    title: 'Digital Smile Design',
    description: 'Advanced 3D digital planning that lets you preview your perfect smile before any treatment begins. Precision-engineered for flawless outcomes.',
    tag: 'Signature',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
      </svg>
    ),
    title: 'Clear Aligners',
    description: 'Invisible orthodontic treatment using precision-crafted aligners for a perfect bite and beautiful smile. Discreet, comfortable, and effective.',
    tag: 'Popular',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: 'Mouth Guards',
    description: 'Custom-fitted protective guards for athletes and those with bruxism, engineered for maximum comfort and long-term protection.',
    tag: '',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: 'Essix Retainers',
    description: 'Ultra-thin, crystal-clear retainers that maintain your smile alignment with undetectable precision after orthodontic treatment.',
    tag: '',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    title: 'Sleep Dentistry',
    description: 'Comfortable dental care under conscious sedation for a completely anxiety-free treatment experience. Rest while we perfect your smile.',
    tag: '',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
      </svg>
    ),
    title: 'Porcelain Veneers',
    description: 'Ultra-thin, custom-crafted porcelain shells that create a luminous, flawless smile. The gold standard in cosmetic dental transformation.',
    tag: 'Premium',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
    title: 'Teeth Whitening',
    description: 'Professional-grade whitening delivering dramatically brighter, more youthful results in a single session. Safe, fast, and lasting.',
    tag: '',
  },
]

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: LUXURY_EASE },
  }),
}

export default function DentalTreatments() {
  return (
    <section id="dental" className="py-32 bg-luxury-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="max-w-2xl mb-20"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            variants={fadeUp}
            className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
          >
            Dental Excellence
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="font-display font-bold text-white leading-[1.08]"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
          >
            Precision Dental
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #C8A96B 0%, #E8DCCB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Treatments
            </span>
          </motion.h2>
        </motion.div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-white/5 rounded-2xl overflow-hidden">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.title}
              custom={index}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.35, ease: LUXURY_EASE }}
              className="group relative bg-luxury-black p-8 cursor-default hover:bg-white/4"
              style={{ transition: 'background-color 0.4s ease' }}
            >
              {/* Gold top-border reveal on hover */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gold/0 group-hover:bg-gold/20 transition-colors duration-500" />

              {treatment.tag && (
                <span className="absolute top-6 right-6 text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-gold/15 text-gold font-semibold">
                  {treatment.tag}
                </span>
              )}

              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                className="text-gold/50 group-hover:text-gold mb-6 w-fit transition-colors duration-400"
              >
                {treatment.icon}
              </motion.div>

              <h3 className="font-display font-semibold text-white text-lg mb-3 leading-snug">
                {treatment.title}
              </h3>
              <p className="text-white/35 text-sm leading-relaxed mb-6">
                {treatment.description}
              </p>

              <div className="flex items-center gap-2 text-gold/40 group-hover:text-gold transition-colors duration-300">
                <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Learn More</span>
                <span className="group-hover:translate-x-1.5 transition-transform duration-300 text-xs inline-block">→</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center mt-14"
        >
          <motion.a
            href="/dental"
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="inline-flex items-center gap-3 px-8 py-4 border border-white/12 text-white/55 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:border-gold/30 hover:text-gold transition-colors duration-300"
          >
            View All Treatments
            <span className="text-xs">→</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
