'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { LUXURY_EASE } from '@/lib/animations'

type FaqCategory = 'facial' | 'dental' | 'rehab'

interface FaqSectionProps {
  category: FaqCategory
  variant?: 'light' | 'dark'
}

const ITEM_COUNT = 6

export default function FaqSection({ category, variant = 'light' }: FaqSectionProps) {
  const t = useTranslations('faq')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const items = Array.from({ length: ITEM_COUNT }, (_, i) => ({
    q: t(`${category}.${i}.q`),
    a: t(`${category}.${i}.a`),
  }))

  const isDark = variant === 'dark'

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i)

  return (
    <section
      className={`py-24 ${isDark ? 'bg-luxury-black' : 'bg-beige-light'}`}
      aria-labelledby={`faq-heading-${category}`}
    >
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <div className="mb-12 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className={`block text-[10px] tracking-[0.4em] uppercase font-medium mb-4 ${isDark ? 'text-gold' : 'text-gold'}`}
          >
            {t('eyebrow')}
          </motion.span>
          <motion.h2
            id={`faq-heading-${category}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: LUXURY_EASE }}
            className={`font-display font-bold leading-tight ${isDark ? 'text-white' : 'text-luxury-black'}`}
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
          >
            {t(`${category}Title`)}
          </motion.h2>
        </div>

        <dl className="space-y-2">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            const btnId = `faq-btn-${category}-${i}`
            const panelId = `faq-panel-${category}-${i}`

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05, ease: LUXURY_EASE }}
                className={`rounded-2xl border transition-colors duration-300 overflow-hidden ${
                  isDark
                    ? isOpen
                      ? 'border-gold/30 bg-white/4'
                      : 'border-white/8 bg-white/2 hover:border-white/15'
                    : isOpen
                      ? 'border-olive/30 bg-white'
                      : 'border-beige hover:border-olive/20 bg-white'
                }`}
              >
                <dt>
                  <button
                    id={btnId}
                    type="button"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className={`w-full flex items-center justify-between gap-6 px-7 py-5 text-left transition-colors duration-200 ${
                      isDark
                        ? 'text-white hover:text-gold'
                        : 'text-luxury-black hover:text-olive'
                    }`}
                  >
                    <span className="font-display font-semibold text-base leading-snug">
                      {item.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isDark
                          ? isOpen ? 'bg-gold text-luxury-black' : 'bg-white/10 text-white/50'
                          : isOpen ? 'bg-olive text-white' : 'bg-beige text-luxury-black/40'
                      }`}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                      >
                        <line x1="5" y1="1" x2="5" y2="9" />
                        <line x1="1" y1="5" x2="9" y2="5" />
                      </svg>
                    </span>
                  </button>
                </dt>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.dd
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: LUXURY_EASE }}
                      className="overflow-hidden"
                    >
                      <p
                        className={`px-7 pb-6 text-sm leading-relaxed ${
                          isDark ? 'text-white/55' : 'text-luxury-black/55'
                        }`}
                      >
                        {item.a}
                      </p>
                    </motion.dd>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </dl>
      </div>
    </section>
  )
}
