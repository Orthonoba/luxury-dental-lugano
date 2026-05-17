'use client'

import { motion } from 'framer-motion'
import { blurIn, LUXURY_EASE } from '@/lib/animations'

const pillars = [
  {
    number: '01',
    title: 'Swiss Precision',
    description:
      'Every treatment is executed with meticulous attention to detail, combining clinical excellence with artistic vision for results that are flawless and enduring.',
  },
  {
    number: '02',
    title: 'Natural Beauty',
    description:
      'We enhance your natural features, creating results that are harmonious, balanced, and authentically you — never overdone, always refined.',
  },
  {
    number: '03',
    title: 'Digital Dentistry',
    description:
      'Advanced 3D imaging and digital smile design technology allow us to preview and plan your transformation before any treatment begins.',
  },
  {
    number: '04',
    title: 'Personalized Care',
    description:
      'Each treatment plan is uniquely yours — designed around your goals, anatomy, and aesthetic vision, with zero compromise on quality.',
  },
]

export default function PhilosophySection() {
  return (
    <section id="philosophy" className="py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-32"
          >
            <span className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6">
              Our Approach
            </span>
            <motion.h2
              variants={blurIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-display font-bold text-luxury-black leading-[1.08] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
            >
              The Art of
              <span className="block text-olive italic">Precision Beauty</span>
            </motion.h2>
            <p className="text-luxury-black/55 text-lg leading-relaxed mb-6">
              At Luxury Dental & Facial Estética, we believe that exceptional results come from the
              intersection of scientific precision and artistic sensitivity.
            </p>
            <p className="text-luxury-black/45 leading-relaxed mb-10">
              Our philosophy is rooted in Swiss minimalism — removing the unnecessary, enhancing
              the essential, and delivering results that stand the test of time. Every smile we
              design, every treatment we perform is guided by a deep respect for natural beauty.
            </p>
            <motion.a
              href="#contact"
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="inline-flex items-center gap-3 text-olive text-[11px] tracking-[0.25em] uppercase font-semibold"
            >
              Begin Your Journey
              <motion.span
                variants={{
                  rest: { width: '2rem', transition: { ease: LUXURY_EASE, duration: 0.4 } },
                  hover: { width: '3.5rem', transition: { ease: LUXURY_EASE, duration: 0.4 } },
                }}
                className="h-px bg-olive inline-block"
              />
            </motion.a>
          </motion.div>

          {/* Right column — pillars */}
          <div className="space-y-1">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group flex gap-8 p-8 rounded-2xl hover:bg-beige-light transition-all duration-400 cursor-default"
              >
                <span className="font-display text-4xl font-bold text-beige group-hover:text-gold/30 transition-colors duration-400 shrink-0 leading-none mt-1">
                  {pillar.number}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-luxury-black text-xl mb-3 group-hover:text-olive transition-colors duration-300">
                    {pillar.title}
                  </h3>
                  <p className="text-luxury-black/50 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
