'use client'

import { motion } from 'framer-motion'
import { ImagePlaceholder } from '@/components/ui'
import FaqSection from '@/components/sections/FaqSection'

const treatments = [
  {
    title: 'Digital Smile Design',
    tag: 'Signature',
    description:
      'Advanced 3D digital planning that lets you preview your perfect smile before any treatment begins. We analyse facial proportions, lip dynamics, and dental aesthetics to craft a result that is uniquely yours.',
    benefits: ['Preview your result digitally', 'Precise, predictable outcomes', 'Personalised to your face'],
    accent: 'olive',
  },
  {
    title: 'Porcelain Veneers',
    tag: 'Premium',
    description:
      'Ultra-thin, custom-crafted porcelain shells that transform the shape, colour, and alignment of your teeth. The gold standard in cosmetic dentistry — natural-looking, durable, and luminous.',
    benefits: ['Long-lasting results', 'Natural translucency', 'Minimal tooth preparation'],
    accent: 'gold',
  },
  {
    title: 'Clear Aligners',
    tag: 'Popular',
    description:
      'Invisible orthodontic treatment using precision-crafted removable aligners. Correct bite issues and achieve straight teeth discreetly, without brackets or wires.',
    benefits: ['Removable & comfortable', 'Virtually invisible', 'Digital treatment preview'],
    accent: 'olive',
  },
  {
    title: 'Teeth Whitening',
    tag: '',
    description:
      'Professional in-office whitening that delivers dramatically brighter, more youthful results in a single session. Safe, fast, and clinically superior to over-the-counter alternatives.',
    benefits: ['Results in one session', 'Up to 8 shades brighter', 'Clinically safe'],
    accent: 'gold',
  },
  {
    title: 'Sleep Dentistry',
    tag: '',
    description:
      'Receive dental care in complete comfort under conscious sedation. Ideal for anxious patients or complex treatments requiring extended sessions.',
    benefits: ['Anxiety-free experience', 'Multiple treatments in one session', 'Medically supervised'],
    accent: 'olive',
  },
  {
    title: 'Mouth Guards',
    tag: '',
    description:
      'Custom-fitted protective guards for athletes and those with bruxism. Engineered for maximum comfort and long-term dental protection.',
    benefits: ['Custom-fitted precision', 'Protects enamel', 'Durable & comfortable'],
    accent: 'gold',
  },
  {
    title: 'Essix Retainers',
    tag: '',
    description:
      'Crystal-clear, ultra-thin retainers that maintain your smile alignment after orthodontic treatment. Virtually undetectable and easy to wear.',
    benefits: ['Invisible when worn', 'Easy maintenance', 'Long-lasting protection'],
    accent: 'olive',
  },
]

export default function DentalContent() {
  return (
    <>
      {/* Featured — Digital Smile Design */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-olive/10 text-olive text-[10px] tracking-[0.3em] uppercase font-semibold mb-6">
                Signature Treatment
              </span>
              <h2
                className="font-display font-bold text-luxury-black leading-[1.08] mb-6"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                Digital Smile
                <span className="block text-olive italic font-medium">Design</span>
              </h2>
              <p className="text-luxury-black/55 text-lg leading-relaxed mb-6">
                Before any instrument touches your teeth, you will see your transformed smile in precise 3D detail. Digital Smile Design combines facial analysis, digital photography, and advanced software to create a treatment preview that is unique to you.
              </p>
              <p className="text-luxury-black/40 leading-relaxed mb-10">
                This is not a filter or an approximation — it is a clinically accurate digital wax-up that guides every step of your treatment, from veneer design to aligner therapy.
              </p>
              <a
                href="/contact"
                className="inline-flex px-8 py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-xl hover:shadow-olive/25 hover:-translate-y-0.5"
              >
                Book Consultation
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <ImagePlaceholder aspectRatio="aspect-[4/5]" label="Digital Smile Design" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Treatments grid */}
      <section className="py-32 bg-luxury-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
            >
              Full Treatment Menu
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-white leading-[1.08]"
              style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
            >
              Every smile is
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #C8A96B 0%, #E8DCCB 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                a unique story
              </span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {treatments.map((t, index) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group relative bg-luxury-black p-8 hover:bg-white/4 transition-all duration-500"
              >
                {t.tag && (
                  <span className="absolute top-6 right-6 text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full bg-gold/15 text-gold font-semibold">
                    {t.tag}
                  </span>
                )}

                <h3 className="font-display font-semibold text-white text-xl mb-3">{t.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed mb-6">{t.description}</p>

                <ul className="space-y-1.5 mb-6">
                  {t.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-white/30 text-xs">
                      <span className="w-1 h-1 rounded-full bg-gold/50 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>

                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 text-gold/40 group-hover:text-gold transition-colors duration-300 text-[10px] tracking-[0.2em] uppercase font-medium"
                >
                  Learn More
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
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
            Your smile deserves
            <span className="block text-olive italic font-medium">the best</span>
          </motion.h2>
          <p className="text-luxury-black/45 mb-10">
            Book a complimentary consultation and let us create a personalised treatment plan for you.
          </p>
          <a
            href="/contact"
            className="inline-flex px-8 py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-xl hover:shadow-olive/25 hover:-translate-y-0.5"
          >
            Book Consultation
          </a>
        </div>
      </section>

      {/* FAQ — Aesthetic Dentistry */}
      <FaqSection category="dental" variant="light" />

      {/* FAQ — Oral Rehabilitation */}
      <FaqSection category="rehab" variant="dark" />
    </>
  )
}
