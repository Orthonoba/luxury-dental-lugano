'use client'

import { motion } from 'framer-motion'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { Link } from '@/navigation'

const steps = [
  {
    number: '01',
    title: 'Facial & Dental Analysis',
    description:
      'We capture high-resolution photography and video of your face, smile, and teeth in motion. Every proportion, asymmetry, and characteristic is documented with clinical precision.',
  },
  {
    number: '02',
    title: 'Digital Design',
    description:
      'Using advanced DSD software, our clinician designs your ideal smile — adjusting shape, symmetry, and proportions relative to your facial features, skin tone, and personality.',
  },
  {
    number: '03',
    title: 'Your Personal Preview',
    description:
      'We present your digital smile preview on screen and, in many cases, as a physical mock-up worn in your own mouth. You see the result before any irreversible step is taken.',
  },
  {
    number: '04',
    title: 'Refined & Approved',
    description:
      'You give feedback and we refine the design until it feels completely right. Only once you have approved every detail do we proceed to crafting your final restorations.',
  },
]

const treatments = [
  { label: 'Porcelain Veneers', description: 'Ultra-thin ceramic facings that transform shape, colour, and proportions in as few as two appointments.' },
  { label: 'Composite Bonding', description: 'Artistic resin sculpting for immediate smile enhancement — reversible, quick, and remarkably lifelike.' },
  { label: 'All-Ceramic Crowns', description: 'Full-coverage restorations designed to the exact proportions defined in your digital smile blueprint.' },
  { label: 'Teeth Whitening', description: 'Professional-grade brightening calibrated to match the shade specified in your DSD preview.' },
  { label: 'Clear Aligners', description: 'Orthodontic alignment guided by the DSD blueprint to position teeth for the ideal cosmetic outcome.' },
  { label: 'Gum Contouring', description: 'Soft-tissue reshaping to perfect the frame of your smile — adding symmetry and lengthening short teeth.' },
]

export default function DigitalSmileDesignContent() {
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
                The DSD Protocol
              </span>
              <h2
                className="font-display font-bold text-luxury-black leading-[1.08] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                Design the smile.
                <span className="block text-olive italic font-medium">Then create it.</span>
              </h2>
              <p className="text-luxury-black/55 text-lg leading-relaxed mb-6">
                Digital Smile Design is not just a planning tool — it is a philosophy. It shifts the
                entire process from reactive to proactive, from assumption to certainty. Before any
                preparation, any bonding, any veneer — you see exactly what your smile will look like.
              </p>
              <p className="text-luxury-black/45 leading-relaxed mb-10">
                The result is a smile that is uniquely yours: harmonious with your features,
                aligned with your personality, and executed with Swiss precision.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3.5 bg-olive text-white text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-lg hover:shadow-olive/25 hover:-translate-y-px"
              >
                Start Your Design
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <ImagePlaceholder aspectRatio="aspect-[4/5]" label="DSD Planning Session" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4-step process */}
      <section className="py-32 bg-luxury-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
            >
              The Four-Step Process
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}
            >
              From consultation
              <span className="block text-olive italic font-medium">to approved result</span>
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: i * 0.1 }}
                className="bg-white/4 border border-white/8 rounded-2xl p-8 hover:border-gold/20 transition-colors"
              >
                <span className="font-display text-4xl font-bold text-gold/20 block mb-4">{step.number}</span>
                <h3 className="font-display font-semibold text-white text-xl mb-4">{step.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Treatments grid */}
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
              Treatments delivered
              <span className="block text-olive italic font-medium">through DSD</span>
            </motion.h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((t, i) => (
              <motion.div
                key={t.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="bg-white border border-luxury-black/6 rounded-2xl p-7 hover:shadow-md transition-shadow"
              >
                <h3 className="font-display font-semibold text-luxury-black text-lg mb-3">{t.label}</h3>
                <p className="text-luxury-black/50 text-sm leading-relaxed">{t.description}</p>
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
            See your new smile
            <span className="block text-olive italic font-medium">before you commit</span>
          </motion.h2>
          <p className="text-white/45 mb-10 leading-relaxed">
            Book your Digital Smile Design consultation. We will capture your smile, design your transformation, and show you the result — all in the first appointment.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-10 py-4 bg-olive text-white text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-lg hover:shadow-olive/25 hover:-translate-y-px"
          >
            Begin Your Transformation
          </Link>
        </div>
      </section>
    </>
  )
}
