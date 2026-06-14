'use client'

import { motion } from 'framer-motion'
import { ImagePlaceholder } from '@/components/ui'

const values = [
  {
    number: '01',
    title: 'Swiss Precision',
    description:
      'Every treatment is planned with meticulous attention to detail. We use the most advanced digital tools available to ensure outcomes that are both predictable and extraordinary.',
  },
  {
    number: '02',
    title: 'Artistic Vision',
    description:
      'Beauty is not manufactured — it is revealed. Our approach to dental and facial aesthetics is guided by principles of natural harmony, facial proportion, and individual character.',
  },
  {
    number: '03',
    title: 'Personalised Care',
    description:
      'No two smiles are identical. We invest time to understand your unique goals, concerns, and aesthetic preferences before crafting a treatment that is entirely yours.',
  },
]

export default function AboutContent() {
  return (
    <>
      {/* Philosophy section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6">
                Our Philosophy
              </span>
              <h2
                className="font-display font-bold text-luxury-black leading-[1.08] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                Dentistry as an
                <span className="block text-olive italic font-medium">art form</span>
              </h2>
              <p className="text-luxury-black/55 text-lg leading-relaxed mb-6">
                Founded in the heart of Paradiso, Lugano — where the Swiss Alps meet the Mediterranean warmth of Ticino — Luxury Dental was created to offer something rare: a clinic where clinical mastery and aesthetic sensibility exist in perfect balance.
              </p>
              <p className="text-luxury-black/45 leading-relaxed">
                We believe that transforming a smile is a deeply personal act. It requires not only technical precision but genuine empathy, an eye for beauty, and an unwavering commitment to the patient&apos;s wellbeing. This is the standard we hold ourselves to with every treatment, every day.
              </p>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <ImagePlaceholder aspectRatio="aspect-[4/5]" label="Clinic Interior" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-32 bg-beige-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
            >
              What We Stand For
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-luxury-black leading-tight"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
            >
              Three Pillars of
              <span className="block text-olive italic font-medium">Excellence</span>
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={v.number}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="bg-white rounded-3xl p-10 hover:shadow-2xl hover:shadow-olive/8 transition-all duration-500"
              >
                <span className="block font-display text-5xl font-bold text-beige mb-6 leading-none">
                  {v.number}
                </span>
                <h3 className="font-display font-bold text-luxury-black text-xl mb-4">{v.title}</h3>
                <p className="text-luxury-black/50 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <ImagePlaceholder aspectRatio="aspect-[3/2]" label="Lugano, Switzerland" />
            </motion.div>

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6">
                Lugano, Switzerland
              </span>
              <h2
                className="font-display font-bold text-luxury-black leading-[1.08] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                Set on the shores
                <span className="block text-olive italic font-medium">of Lake Lugano</span>
              </h2>
              <p className="text-luxury-black/55 text-lg leading-relaxed mb-6">
                Our clinic is located in Paradiso — the most serene quarter of Lugano — overlooking the lake and the surrounding Alpine landscape. The environment is intentional: calm, beautiful, and conducive to the luxury experience we offer.
              </p>
              <div className="pt-6 border-t border-beige">
                <p className="text-luxury-black/40 text-sm font-medium tracking-wide mb-1">Via Riva Paradiso 4</p>
                <p className="text-luxury-black/30 text-sm">6900 Paradiso / Lugano, Switzerland</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

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
            Ready to begin
            <span className="block text-gold italic font-medium">your journey?</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/40 mb-10"
          >
            Book a complimentary consultation and discover how we can transform your smile.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="/contact"
              className="px-8 py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-xl hover:shadow-olive/25 hover:-translate-y-0.5"
            >
              Book Consultation
            </a>
            <a
              href="/team"
              className="px-8 py-4 border border-white/15 text-white/70 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:bg-white/8 hover:border-white/30 transition-all duration-300"
            >
              Meet The Team
            </a>
          </motion.div>
        </div>
      </section>
    </>
  )
}
