'use client'

import { motion } from 'framer-motion'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { Link } from '@/navigation'

const types = [
  {
    title: 'Essix Retainers',
    description:
      'Clear, removable retainers that fit over your teeth like an aligner. Virtually invisible during wear, easy to clean, and ideal for day or nighttime use.',
    note: 'Removable · Transparent · Most popular',
  },
  {
    title: 'Fixed (Bonded) Retainers',
    description:
      'A thin wire bonded to the back of your front teeth, providing permanent, effortless retention without any daily responsibility.',
    note: 'Permanent · Invisible · Zero effort',
  },
  {
    title: 'Combination Approach',
    description:
      'Many patients benefit from both — a fixed retainer for the front teeth combined with a removable Essix for comprehensive protection.',
    note: 'Optimal · Comprehensive · Recommended',
  },
]

const tips = [
  { title: 'Wear as prescribed', description: 'Follow your retainer schedule exactly. Teeth can shift surprisingly quickly when retainers are neglected.' },
  { title: 'Clean daily', description: 'Rinse Essix retainers with cold water after each use. Use a soft toothbrush and retainer cleaner weekly.' },
  { title: 'Store safely', description: 'Always return your retainer to its case when not wearing it. Heat and pets are the most common causes of loss.' },
  { title: 'Replace when needed', description: 'Essix retainers typically last 1–3 years. We will monitor fit at your regular checkups and advise when replacement is due.' },
]

export default function RetainersContent() {
  return (
    <>
      {/* Intro */}
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
                Keep Your Results
              </span>
              <h2
                className="font-display font-bold text-luxury-black leading-[1.08] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                Your alignment
                <span className="block text-olive italic font-medium">is worth protecting</span>
              </h2>
              <p className="text-luxury-black/55 text-lg leading-relaxed mb-6">
                Completing orthodontic treatment — whether with clear aligners or traditional braces — is a
                significant achievement. A retainer ensures that the teeth stay in their new positions
                as the surrounding bone and tissue adapt.
              </p>
              <p className="text-luxury-black/45 leading-relaxed mb-10">
                Without retention, teeth naturally drift back toward their original positions. Our
                precision-crafted retainers make maintenance effortless and discreet.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3.5 bg-olive text-white text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-lg hover:shadow-olive/25 hover:-translate-y-px"
              >
                Get Your Retainer
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <ImagePlaceholder aspectRatio="aspect-[4/5]" label="Essix Retainer" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Types */}
      <section className="py-32 bg-luxury-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}
            >
              Choose the retention
              <span className="block text-olive italic font-medium">that fits your life</span>
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {types.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white/4 border border-white/8 rounded-2xl p-8 hover:border-gold/20 transition-colors"
              >
                <h3 className="font-display font-semibold text-white text-xl mb-4">{t.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-6">{t.description}</p>
                <span className="text-[10px] tracking-[0.25em] text-gold/60 uppercase">{t.note}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Care tips */}
      <section className="py-32 bg-beige-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display font-bold text-luxury-black"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}
            >
              Caring for your
              <span className="block text-olive italic font-medium">retainer</span>
            </motion.h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {tips.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="flex gap-5"
              >
                <span className="text-gold text-2xl mt-1 shrink-0">—</span>
                <div>
                  <h3 className="font-display font-semibold text-luxury-black text-lg mb-2">{tip.title}</h3>
                  <p className="text-luxury-black/50 text-sm leading-relaxed">{tip.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-luxury-black mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Preserve your
            <span className="block text-olive italic font-medium">perfect alignment</span>
          </motion.h2>
          <p className="text-luxury-black/45 mb-10 leading-relaxed">
            Whether you are finishing orthodontic treatment or replacing an old retainer, contact us to get started.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-10 py-4 bg-olive text-white text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-lg hover:shadow-olive/25 hover:-translate-y-px"
          >
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
