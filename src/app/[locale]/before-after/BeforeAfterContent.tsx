'use client'

import { motion } from 'framer-motion'
import { ImagePlaceholder } from '@/components/ui'

const cases = [
  { treatment: 'Digital Smile Design', description: 'Complete smile makeover with porcelain veneers', id: 1 },
  { treatment: 'Porcelain Veneers', description: 'Full arch veneer placement — 10 upper teeth', id: 2 },
  { treatment: 'Clear Aligners', description: '14 months of invisible orthodontic treatment', id: 3 },
  { treatment: 'Teeth Whitening', description: 'Professional in-office whitening — single session', id: 4 },
  { treatment: 'Digital Smile Design', description: 'Composite bonding and whitening combination', id: 5 },
  { treatment: 'Porcelain Veneers', description: 'Smile makeover with gum contouring', id: 6 },
]

export default function BeforeAfterContent() {
  return (
    <>
      {/* Disclaimer */}
      <section className="pt-16 pb-8 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-luxury-black/30 text-xs leading-relaxed border border-beige rounded-xl px-6 py-4">
              Results shown are from real patients treated at Luxury Dental Paradiso. Individual results vary depending on the specific treatment, starting condition, and patient compliance. All patients provided consent for the use of their before-and-after documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Cases grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-12">
            {cases.map((c, index) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                {/* Treatment label */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] tracking-[0.3em] uppercase font-semibold text-olive">{c.treatment}</span>
                  <span className="text-luxury-black/25 text-xs">Case {String(c.id).padStart(2, '0')}</span>
                </div>

                {/* Before / After pair */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <ImagePlaceholder aspectRatio="aspect-[3/4]" label="Before" />
                    <p className="text-center text-[9px] tracking-[0.2em] uppercase text-luxury-black/30 mt-2 font-medium">Before</p>
                  </div>
                  <div>
                    <ImagePlaceholder aspectRatio="aspect-[3/4]" label="After" />
                    <p className="text-center text-[9px] tracking-[0.2em] uppercase text-olive/50 mt-2 font-medium">After</p>
                  </div>
                </div>

                <p className="text-luxury-black/40 text-sm leading-relaxed">{c.description}</p>
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
            Your transformation
            <span className="block text-olive italic font-medium">starts here</span>
          </motion.h2>
          <p className="text-luxury-black/45 mb-10">
            Book a complimentary consultation to discuss your goals and begin your personal treatment plan.
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
