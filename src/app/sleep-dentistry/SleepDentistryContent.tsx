'use client'

import { motion } from 'framer-motion'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'
import { Link } from '@/navigation'

const benefits = [
  {
    icon: '◎',
    title: 'Complete Comfort',
    description:
      'You remain fully relaxed throughout every minute of your treatment. No tension, no discomfort — just calm.',
  },
  {
    icon: '◎',
    title: 'Multiple Treatments in One Visit',
    description:
      'Sedation allows us to complete extensive work in a single session, reducing the total number of appointments required.',
  },
  {
    icon: '◎',
    title: 'Ideal for Dental Anxiety',
    description:
      'Whether you have a mild fear or a deep-rooted phobia, conscious sedation gives you back control over your dental health.',
  },
  {
    icon: '◎',
    title: 'Safe & Monitored',
    description:
      'You are fully monitored throughout the procedure by our trained clinical team. Safety is never compromised.',
  },
  {
    icon: '◎',
    title: 'Fast Recovery',
    description:
      'Conscious sedation is not general anaesthesia. You recover quickly and can return home the same day with a companion.',
  },
  {
    icon: '◎',
    title: 'Swiss Clinical Standards',
    description:
      'Every sedation procedure follows the highest Swiss medical protocols — from pre-treatment assessment to post-care guidance.',
  },
]

const steps = [
  { number: '01', title: 'Pre-Treatment Consultation', description: 'We assess your medical history and discuss sedation options. Your comfort and safety are evaluated before any procedure.' },
  { number: '02', title: 'Tailored Sedation Protocol', description: 'A personalised sedation level is chosen — from mild relaxation to deeper conscious sedation, based on your needs and the treatment plan.' },
  { number: '03', title: 'Treatment Under Sedation', description: 'While you rest comfortably, our team completes all planned work with precision — often combining multiple procedures in a single appointment.' },
  { number: '04', title: 'Safe Recovery & Follow-Up', description: 'You recover gently in our clinic before being accompanied home. We follow up the next day to ensure your comfort continues.' },
]

export default function SleepDentistryContent() {
  return (
    <>
      {/* Overview section */}
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
                For Every Patient
              </span>
              <h2
                className="font-display font-bold text-luxury-black leading-[1.08] mb-8"
                style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
              >
                Dentistry that works
                <span className="block text-olive italic font-medium">around your fears</span>
              </h2>
              <p className="text-luxury-black/55 text-lg leading-relaxed mb-6">
                Dental anxiety affects a significant portion of patients — and it is one of the most
                common reasons people delay essential care. At Luxury Dental Paradiso, conscious
                sedation eliminates that barrier entirely.
              </p>
              <p className="text-luxury-black/45 leading-relaxed mb-10">
                You remain awake and responsive throughout the procedure, but in a state of profound
                relaxation. The experience is often described as dreamlike — time passes effortlessly,
                and you feel none of the stress that once held you back.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-3.5 bg-olive text-white text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-lg hover:shadow-olive/25 hover:-translate-y-px"
              >
                Book a Consultation
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <ImagePlaceholder aspectRatio="aspect-[4/5]" label="Sleep Dentistry Suite" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="py-32 bg-luxury-black">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
            >
              Why Choose Sedation
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="font-display font-bold text-white leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}
            >
              Six reasons to choose
              <span className="block text-olive italic font-medium">comfort-first dentistry</span>
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="bg-white/4 border border-white/8 rounded-2xl p-8 hover:border-gold/20 transition-colors duration-300"
              >
                <span className="text-gold text-xl mb-4 block">—</span>
                <h3 className="font-display font-semibold text-white text-lg mb-3">{b.title}</h3>
                <p className="text-white/45 text-sm leading-relaxed">{b.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process steps */}
      <section className="py-32 bg-beige-light">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
            >
              The Process
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-luxury-black"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)' }}
            >
              From first visit to
              <span className="block text-olive italic font-medium">complete recovery</span>
            </motion.h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative"
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
            Ready to reclaim
            <span className="block text-olive italic font-medium">your dental health?</span>
          </motion.h2>
          <p className="text-luxury-black/45 mb-10 leading-relaxed">
            Book a free consultation and let us create a sedation plan that puts your comfort first.
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
