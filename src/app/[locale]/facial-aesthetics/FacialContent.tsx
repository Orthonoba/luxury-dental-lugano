'use client'

import { motion } from 'framer-motion'
import { ImagePlaceholder } from '@/components/ui'
import FaqSection from '@/components/sections/FaqSection'

const treatments = [
  {
    number: '01',
    title: 'Facial Cleansing',
    description:
      'A deep, professional cleansing ritual that removes impurities, unclogs pores, and restores your skin\'s natural luminosity. The foundation of every aesthetic journey.',
    image: 'Facial Cleansing',
  },
  {
    number: '02',
    title: 'Skin Rejuvenation',
    description:
      'Advanced treatments to restore vitality, even skin tone, and minimise the visible signs of ageing. Tailored to your skin type and specific concerns.',
    image: 'Skin Rejuvenation',
  },
  {
    number: '03',
    title: 'Facial Harmony',
    description:
      'A holistic assessment and treatment approach focused on achieving natural facial balance. We consider your features as a whole, not in isolation.',
    image: 'Facial Harmony',
  },
  {
    number: '04',
    title: 'Anti-Aging Treatments',
    description:
      'Clinically advanced protocols to address fine lines, loss of volume, and skin laxity. Results are natural, progressive, and beautifully subtle.',
    image: 'Anti-Aging',
  },
  {
    number: '05',
    title: 'Hydration Therapies',
    description:
      'Intensive hydration treatments that restore moisture balance, plump the skin, and create a radiant, healthy complexion from the inside out.',
    image: 'Hydration Therapy',
  },
]

export default function FacialContent() {
  return (
    <>
      {/* Philosophy */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6">
                Our Approach
              </span>
              <h2
                className="font-display font-bold text-luxury-black leading-[1.08] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                Beauty is not
                <span className="block text-olive italic font-medium">manufactured</span>
              </h2>
              <p className="text-luxury-black/55 text-lg leading-relaxed mb-6">
                Our approach to facial aesthetics is guided by the principles of natural harmony and individual character. We do not impose a template of beauty — we reveal and refine what already makes you uniquely beautiful.
              </p>
              <p className="text-luxury-black/40 leading-relaxed">
                Every facial treatment begins with a thorough consultation that considers your skin type, facial architecture, lifestyle, and aesthetic goals. This allows us to design a treatment path that delivers results which are genuinely yours.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <ImagePlaceholder aspectRatio="aspect-[4/5]" label="Facial Treatment" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Treatments list */}
      <section className="py-32 bg-beige-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
            >
              Treatments
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-luxury-black leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
            >
              Tailored Facial
              <span className="block text-olive italic font-medium">Experiences</span>
            </motion.h2>
          </div>

          <div className="space-y-8">
            {treatments.map((t, index) => (
              <motion.div
                key={t.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group grid md:grid-cols-5 gap-8 bg-white rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-olive/8 transition-all duration-500"
              >
                {/* Image */}
                <div className="md:col-span-2">
                  <ImagePlaceholder aspectRatio="aspect-[4/3]" label={t.image} className="rounded-none h-full" />
                </div>

                {/* Content */}
                <div className="md:col-span-3 p-10 flex flex-col justify-center">
                  <span className="font-display text-4xl font-bold text-beige leading-none mb-4">
                    {t.number}
                  </span>
                  <h3 className="font-display font-bold text-luxury-black text-2xl mb-4">{t.title}</h3>
                  <p className="text-luxury-black/50 leading-relaxed mb-6">{t.description}</p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-2 text-olive text-[10px] tracking-[0.2em] uppercase font-semibold group-hover:gap-3 transition-all duration-300"
                  >
                    Book Treatment →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ — Facial Aesthetics */}
      <FaqSection category="facial" variant="light" />

      {/* CTA */}
      <section className="py-24 bg-luxury-black">
        <div className="h-px bg-linear-to-r from-transparent via-gold/20 to-transparent mb-24" />
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-bold text-white leading-tight mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Begin your
            <span className="block text-gold italic font-medium">facial journey</span>
          </motion.h2>
          <p className="text-white/40 mb-10">
            Consult with our specialists to design a personalised facial aesthetics programme.
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
