'use client'

import { motion } from 'framer-motion'
import { stagger, fadeUp, floatAnimation } from '@/lib/animations'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

const stats = [
  { value: '1,200+', label: 'Smiles Transformed' },
  { value: '15+', label: 'Years of Excellence' },
  { value: '98%', label: 'Patient Satisfaction' },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0a0d06] via-[#141a0a] to-[#1e2810]" />

      {/* Ambient orbs — floating */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={floatAnimation}
          className="absolute top-1/4 -left-20 w-125 h-125 rounded-full bg-olive/8 blur-[120px]"
        />
        <motion.div
          animate={{ y: [0, 10, 0], transition: { duration: 7, repeat: Infinity, ease: 'easeInOut' } }}
          className="absolute bottom-1/4 -right-20 w-100 h-100 rounded-full bg-gold/8 blur-[100px]"
        />
        <motion.div
          animate={{ y: [0, -6, 0], transition: { duration: 9, repeat: Infinity, ease: 'easeInOut' } }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-75 h-75 rounded-full bg-beige/4 blur-[80px]"
        />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,169,107,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,107,0.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        <div className="lg:grid lg:grid-cols-5 lg:gap-16 lg:items-center">

          {/* Left: Text content (3/5 width on desktop) */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3 text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-gold/25 bg-gold/8 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-medium">
                Digital Smile Design & Facial Aesthetics
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUp}
              className="font-display font-bold text-white leading-[1.04] tracking-tight mb-8"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              Transform
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #C8A96B 0%, #E8DCCB 50%, #C8A96B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Your Smile,
              </span>
              Reveal Your Beauty
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeUp}
              className="max-w-xl mx-auto lg:mx-0 text-white/50 text-lg lg:text-xl leading-relaxed mb-12"
            >
              Where Swiss precision meets natural beauty. We craft personalized dental and
              facial aesthetic treatments with artistry and clinical excellence.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16 lg:mb-0"
            >
              <a
                href="/contact"
                className="px-8 py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-2xl hover:shadow-olive/30 hover:-translate-y-0.5"
              >
                Book Consultation
              </a>
              <a
                href="/dental"
                className="px-8 py-4 border border-white/15 text-white/80 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:bg-white/8 hover:border-white/30 transition-all duration-300"
              >
                Explore Services
              </a>
            </motion.div>

            {/* Stats — desktop only below CTAs */}
            <motion.div
              variants={fadeUp}
              className="hidden lg:grid grid-cols-3 gap-6 max-w-sm mt-16 border-t border-white/8 pt-10"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-2xl font-bold text-gold leading-none mb-1.5">
                    {stat.value}
                  </p>
                  <p className="text-white/35 text-[9px] tracking-[0.2em] uppercase">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Editorial image placeholder (2/5 width on desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:block lg:col-span-2 relative"
          >
            <div className="relative">
              {/* Decorative border frame */}
              <div className="absolute -inset-3 border border-gold/15 rounded-3xl" />
              <div className="absolute -inset-6 border border-white/5 rounded-3xl" />
              <ImagePlaceholder
                aspectRatio="3/4"
                label="Clinic Interior"
                className="rounded-2xl overflow-hidden"
              />
              {/* Floating stat card */}
              <motion.div
                animate={{ y: [0, -6, 0], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
                className="absolute -bottom-8 -left-8 bg-luxury-black/90 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-4"
              >
                <p className="font-display text-2xl font-bold text-gold leading-none mb-1">1,200+</p>
                <p className="text-white/40 text-[9px] tracking-[0.2em] uppercase">Smiles Transformed</p>
              </motion.div>
              {/* Gold accent dot */}
              <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-gold/20 border border-gold/40" />
            </div>
          </motion.div>
        </div>

        {/* Stats — mobile only */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.85 }}
          className="lg:hidden grid grid-cols-3 gap-4 max-w-xl mx-auto border-t border-white/8 pt-10 mt-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold text-gold leading-none mb-1.5">
                {stat.value}
              </p>
              <p className="text-white/35 text-[10px] tracking-[0.2em] uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-white/25 text-[9px] tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-10 bg-linear-to-b from-gold/40 to-transparent"
        />
      </motion.div>
    </section>
  )
}
