'use client'

import { motion } from 'framer-motion'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { Link } from '@/navigation'

const types = [
  {
    title: 'Night Guards (Bruxism)',
    description:
      'Protect against nocturnal grinding and clenching. Custom-fitted for maximum comfort during sleep, preserving enamel and preventing jaw pain.',
    label: 'Most common',
  },
  {
    title: 'Sports Mouthguards',
    description:
      'Full-coverage protection for contact and impact sports. Our guards absorb shock more effectively than any over-the-counter alternative.',
    label: 'For athletes',
  },
  {
    title: 'TMJ / Occlusal Splints',
    description:
      'Therapeutic devices that reposition your jaw to relieve tension, reduce clicking, and alleviate temporomandibular joint pain.',
    label: 'Therapeutic',
  },
]

const process = [
  { number: '01', title: 'Digital Impression', description: 'A precise 3D scan of your teeth and bite is taken — no uncomfortable putty impressions.' },
  { number: '02', title: 'Bespoke Fabrication', description: 'Your guard is milled or vacuum-formed from premium materials in our trusted Swiss laboratory.' },
  { number: '03', title: 'Precision Fitting', description: 'We fit and adjust the guard at a dedicated appointment, ensuring it feels natural from the first night.' },
  { number: '04', title: 'Ongoing Care', description: 'We check and maintain your guard at regular visits. Most guards last 2–5 years with proper care.' },
]

export default function MouthguardsContent() {
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
                Precision Protection
              </span>
              <h2
                className="font-display font-bold text-luxury-black leading-[1.08] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                Protect what
                <span className="block text-olive italic font-medium">we&apos;ve created together</span>
              </h2>
              <p className="text-luxury-black/55 text-lg leading-relaxed mb-6">
                Whether you grind your teeth at night, play contact sports, or suffer from jaw tension,
                a custom mouthguard is one of the most valuable preventive investments you can make
                for your oral health.
              </p>
              <p className="text-luxury-black/45 leading-relaxed mb-10">
                Unlike generic pharmacy guards, our custom devices are built from a precise digital
                model of your unique bite — ensuring optimal fit, comfort, and protection that
                actually works.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3.5 bg-olive text-white text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-lg hover:shadow-olive/25 hover:-translate-y-px"
              >
                Book a Fitting
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <ImagePlaceholder aspectRatio="aspect-[4/5]" label="Custom Mouthguard" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Guard types */}
      <section className="py-32 bg-luxury-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
            >
              Which Guard Is Right for You
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-white"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}
            >
              Three types,
              <span className="block text-olive italic font-medium">one purpose: protection</span>
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
                <span className="text-[10px] tracking-[0.3em] uppercase text-gold/70 mb-4 block">{t.label}</span>
                <h3 className="font-display font-semibold text-white text-xl mb-4">{t.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{t.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
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
              From scan to
              <span className="block text-olive italic font-medium">perfect fit</span>
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <span className="font-display text-5xl font-bold text-luxury-black/10 block mb-4">{step.number}</span>
                <h3 className="font-display font-semibold text-luxury-black text-lg mb-3">{step.title}</h3>
                <p className="text-luxury-black/50 text-sm leading-relaxed">{step.description}</p>
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
            Protect your smile
            <span className="block text-olive italic font-medium">starting today</span>
          </motion.h2>
          <p className="text-luxury-black/45 mb-10 leading-relaxed">
            Book a consultation and we will assess which guard type is right for you — and take your digital scan the same day.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-10 py-4 bg-olive text-white text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-lg hover:shadow-olive/25 hover:-translate-y-px"
          >
            Book Your Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
