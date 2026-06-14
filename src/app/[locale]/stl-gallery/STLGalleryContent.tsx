'use client'

import { motion } from 'framer-motion'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { Link } from '@/navigation'

const galleryItems = [
  { label: 'Full Smile Makeover — 10 Veneers', category: 'Veneers' },
  { label: 'Single Crown — Lower Molar', category: 'Crown' },
  { label: 'Lateral Incisor Replacement', category: 'Implant Crown' },
  { label: 'Upper Anterior Veneers × 6', category: 'Veneers' },
  { label: 'Occlusal Splint — Custom Guard', category: 'Guard' },
  { label: 'Full Arch Rehabilitation', category: 'Full Arch' },
]

const stats = [
  { value: '500+', label: 'Digital cases designed' },
  { value: '0.01mm', label: 'Milling precision tolerance' },
  { value: '100%', label: 'Digitally planned cases' },
]

export default function STLGalleryContent() {
  return (
    <>
      {/* Intro */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center p-8 border border-luxury-black/8 rounded-2xl"
              >
                <p className="font-display font-bold text-luxury-black mb-2" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}>{s.value}</p>
                <p className="text-luxury-black/45 text-sm tracking-wide">{s.label}</p>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
            >
              The Digital Process
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-luxury-black leading-[1.08] mb-8"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              From intraoral scan
              <span className="block text-olive italic font-medium">to milled perfection</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-luxury-black/55 text-lg leading-relaxed"
            >
              Every case in our gallery started as a digital file — a precise 3D model of the patient&apos;s
              anatomy. Using CAD/CAM technology and our partner Swiss laboratory, each restoration is
              milled to tolerances of hundredths of a millimetre, then hand-finished for lifelike aesthetics.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-20 bg-beige-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
            {galleryItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl">
                  <ImagePlaceholder aspectRatio="aspect-square" label={item.label} />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-[9px] tracking-[0.3em] uppercase text-gold/80 block mb-1">{item.category}</span>
                    <p className="text-white text-xs font-medium leading-tight">{item.label}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-luxury-black">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-white mb-6"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            See your case
            <span className="block text-olive italic font-medium">designed in 3D</span>
          </motion.h2>
          <p className="text-white/45 mb-10 leading-relaxed">
            Book a Digital Smile Design consultation and become part of our gallery of precision transformations.
          </p>
          <Link
            href="/digital-smile-design"
            className="inline-flex items-center px-10 py-4 bg-olive text-white text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-lg hover:shadow-olive/25 hover:-translate-y-px"
          >
            Explore Digital Smile Design
          </Link>
        </div>
      </section>
    </>
  )
}
