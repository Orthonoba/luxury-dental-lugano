'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { stagger, fadeUp, blurIn, LUXURY_EASE } from '@/lib/animations'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

const stats = [
  { value: '1,200+', label: 'Smiles Transformed' },
  { value: '15+', label: 'Years of Excellence' },
  { value: '98%', label: 'Patient Satisfaction' },
]

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Cinematic parallax — subtle, architectural
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Dark luxury background */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0a0d06] via-[#141a0a] to-[#1e2810]" />

      {/* Parallax ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y: orbY1 }}
          animate={{ opacity: [0.6, 0.95, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-olive/10 blur-[130px]"
        />
        <motion.div
          style={{ y: orbY2 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-1/4 -right-20 w-[420px] h-[420px] rounded-full bg-gold/8 blur-[110px]"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-2/3 left-1/3 w-[280px] h-[280px] rounded-full bg-beige/5 blur-[80px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-10 right-1/4 w-[200px] h-[200px] rounded-full bg-gold/5 blur-[60px]"
        />
      </div>

      {/* Editorial grid */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,169,107,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,107,0.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,13,6,0.55)_100%)] pointer-events-none" />

      {/* Content — parallax scroll fade */}
      <motion.div
        style={{ y: contentY, opacity: heroOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24"
      >
        <div className="lg:grid lg:grid-cols-5 lg:gap-16 lg:items-center">

          {/* Text — 3/5 */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3 text-center lg:text-left"
          >
            {/* Eyebrow badge */}
            <motion.div
              variants={fadeUp}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-gold/25 bg-gold/8 backdrop-blur-sm mb-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-[10px] tracking-[0.35em] uppercase font-medium">
                Digital Smile Design & Facial Aesthetics
              </span>
            </motion.div>

            {/* Headline — blur reveal */}
            <motion.h1
              variants={blurIn}
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
              <motion.span variants={fadeUp} className="block">
                Reveal Your Beauty
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="max-w-xl mx-auto lg:mx-0 text-white/50 text-lg lg:text-xl leading-relaxed mb-12"
            >
              Where Swiss precision meets natural beauty. We craft personalized dental and
              facial aesthetic treatments with artistry and clinical excellence.
            </motion.p>

            {/* CTAs — spring hover */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16 lg:mb-0"
            >
              <motion.a
                href="/contact"
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="px-8 py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-colors duration-300 hover:shadow-2xl hover:shadow-olive/35"
              >
                Book Consultation
              </motion.a>
              <motion.a
                href="/dental"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="px-8 py-4 border border-white/15 text-white/80 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:bg-white/8 hover:border-white/30 transition-all duration-300"
              >
                Explore Services
              </motion.a>
            </motion.div>

            {/* Stats — desktop */}
            <motion.div
              variants={fadeUp}
              className="hidden lg:grid grid-cols-3 gap-6 max-w-sm mt-16 border-t border-white/8 pt-10"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + i * 0.15, ease: LUXURY_EASE, duration: 0.6 }}
                >
                  <p className="font-display text-2xl font-bold text-gold leading-none mb-1.5">
                    {stat.value}
                  </p>
                  <p className="text-white/35 text-[9px] tracking-[0.2em] uppercase">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Image — 2/5 */}
          <motion.div
            initial={{ opacity: 0, x: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, delay: 0.55, ease: LUXURY_EASE }}
            className="hidden lg:block lg:col-span-2 relative"
          >
            <div className="relative">
              <div className="absolute -inset-3 border border-gold/12 rounded-3xl" />
              <div className="absolute -inset-7 border border-white/4 rounded-3xl" />

              <ImagePlaceholder
                aspectRatio="aspect-[3/4]"
                label="Clinic Interior"
                className="rounded-2xl"
              />

              {/* Floating stat card */}
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-8 -left-8 bg-luxury-black/90 backdrop-blur-xl border border-white/10 rounded-2xl px-5 py-4 shadow-2xl"
              >
                <p className="font-display text-2xl font-bold text-gold leading-none mb-1">1,200+</p>
                <p className="text-white/40 text-[9px] tracking-[0.2em] uppercase">Smiles Transformed</p>
              </motion.div>

              {/* Pulsing gold dot */}
              <motion.div
                animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-gold/30 border border-gold/50"
              />
            </div>
          </motion.div>
        </div>

        {/* Stats — mobile */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
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
      </motion.div>

      {/* Cinematic mouse-style scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-white/20 text-[8px] tracking-[0.5em] uppercase">Scroll</span>
        <div className="relative w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
            className="w-1 h-1.5 rounded-full bg-gold/70"
          />
        </div>
      </motion.div>
    </section>
  )
}
