'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { blurIn, LUXURY_EASE } from '@/lib/animations'

export default function PhilosophySection() {
  const t = useTranslations('philosophy')

  const pillars = [
    { number: '01', title: t('pillars.0.title'), description: t('pillars.0.description') },
    { number: '02', title: t('pillars.1.title'), description: t('pillars.1.description') },
    { number: '03', title: t('pillars.2.title'), description: t('pillars.2.description') },
    { number: '04', title: t('pillars.3.title'), description: t('pillars.3.description') },
  ]

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
              {t('eyebrow')}
            </span>
            <motion.h2
              variants={blurIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-display font-bold text-luxury-black leading-[1.08] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
            >
              {t('headline1')}
              <span className="block text-olive italic">{t('headline2')}</span>
            </motion.h2>
            <p className="text-luxury-black/55 text-lg leading-relaxed mb-6">
              {t('body1')}
            </p>
            <p className="text-luxury-black/45 leading-relaxed mb-10">
              {t('body2')}
            </p>
            <motion.a
              href="#contact"
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="inline-flex items-center gap-3 text-olive text-[11px] tracking-[0.25em] uppercase font-semibold"
            >
              {t('cta')}
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
