'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { blurIn, LUXURY_EASE } from '@/lib/animations'
import { Link } from '@/navigation'

const accents = ['border-l-olive', 'border-l-gold', 'border-l-olive', 'border-l-gold', 'border-l-olive']

export default function FacialAesthetics() {
  const t = useTranslations('facial')

  const services = Array.from({ length: 5 }, (_, i) => ({
    number: String(i + 1).padStart(2, '0'),
    title: t(`services.${i}.title`),
    description: t(`services.${i}.description`),
    accent: accents[i],
  }))

  return (
    <section id="facial" className="py-32 bg-beige overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">
          {/* Left — header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 lg:sticky lg:top-32 self-start"
          >
            <span className="block text-olive text-[10px] tracking-[0.4em] uppercase font-medium mb-6">
              {t('eyebrow')}
            </span>
            <motion.h2
              variants={blurIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="font-display font-bold text-luxury-black leading-[1.08] tracking-tight mb-8"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.25rem)' }}
            >
              {t('headline1')}
              <span className="block italic font-medium text-olive">{t('headline2')}</span>
            </motion.h2>
            <p className="text-luxury-black/55 leading-relaxed mb-10 text-base">
              {t('body')}
            </p>

            {/* Visual accent */}
            <div className="flex gap-3 mb-10">
              <div className="w-12 h-1 rounded-full bg-olive" />
              <div className="w-6 h-1 rounded-full bg-gold" />
              <div className="w-3 h-1 rounded-full bg-beige-light" />
            </div>

            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className="inline-block"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-7 py-3.5 border-2 border-olive text-olive text-[11px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive hover:text-white transition-colors duration-400"
              >
                {t('cta')}
              </Link>
            </motion.div>
          </motion.div>

          {/* Right — services */}
          <div className="lg:col-span-3 space-y-2">
            {services.map((service, index) => (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: LUXURY_EASE }}
                whileHover={{ x: 4 }}
                className={`group flex gap-8 p-8 rounded-2xl border-l-2 border-transparent hover:border-gold hover:bg-white transition-all duration-400 cursor-default ${service.accent} hover:border-l-gold`}
              >
                <span className="font-display text-5xl font-black text-luxury-black/8 group-hover:text-gold/15 transition-colors duration-400 shrink-0 leading-none tabular-nums">
                  {service.number}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-luxury-black text-xl mb-2.5 group-hover:text-olive transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-luxury-black/50 text-sm leading-relaxed">
                    {service.description}
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
