'use client'

import { motion } from 'framer-motion'
import { TESTIMONIALS } from '@/data/testimonials'

const stats = [
  { value: '1,200+', label: 'Smiles Transformed' },
  { value: '98%', label: 'Patient Satisfaction' },
  { value: '15+', label: 'Years of Excellence' },
  { value: '4.9/5', label: 'Average Rating' },
]

export default function TestimonialsContent() {
  return (
    <>
      {/* Stats */}
      <section className="py-20 bg-beige-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <p className="font-display text-4xl lg:text-5xl font-bold text-olive mb-2">{s.value}</p>
                <p className="text-luxury-black/40 text-[11px] tracking-[0.2em] uppercase font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                className="bg-beige-light rounded-3xl p-8 hover:shadow-xl hover:shadow-olive/8 transition-all duration-500"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 12 12" fill="#C8A96B" className="w-3 h-3">
                      <path d="M6 0l1.5 4h4l-3.2 2.4L9.6 11 6 8.4 2.4 11l1.3-4.6L.5 4h4z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-luxury-black/60 text-sm leading-relaxed mb-6 italic">
                  &ldquo;{t.text}&rdquo;
                </blockquote>

                {/* Treatment tag */}
                <span className="inline-block text-[9px] tracking-[0.25em] uppercase px-3 py-1 rounded-full bg-olive/10 text-olive font-semibold mb-5">
                  {t.treatment}
                </span>

                {/* Patient */}
                <div className="flex items-center gap-3 pt-5 border-t border-beige">
                  <div className="w-9 h-9 rounded-full bg-beige flex items-center justify-center shrink-0">
                    <span className="font-display font-bold text-luxury-black/50 text-xs">{t.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-luxury-black text-sm">{t.name}</p>
                    <p className="text-luxury-black/35 text-xs mt-0.5">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-beige-light">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-bold text-luxury-black leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Write your own
            <span className="block text-olive italic font-medium">success story</span>
          </motion.h2>
          <p className="text-luxury-black/45 mb-10">
            Join over 1,200 patients who transformed their smile at Luxury Dental Paradiso.
          </p>
          <a
            href="/contact"
            className="inline-flex px-8 py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-xl hover:shadow-olive/25 hover:-translate-y-0.5"
          >
            Book Consultation
          </a>
        </div>
      </section>
    </>
  )
}
