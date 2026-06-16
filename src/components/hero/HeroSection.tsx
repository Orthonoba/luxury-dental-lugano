'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useInView, animate } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { stagger, fadeUp, blurIn, LUXURY_EASE } from '@/lib/animations'
import { Link } from '@/navigation'
import ImagePlaceholder from '@/components/ui/ImagePlaceholder'

// Counts up from 0 to `to` when the element enters the viewport
function CountUp({ to, suffix = '', display }: { to: number; suffix?: string; display: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)

  useEffect(() => {
    if (!isInView) return
    const controls = animate(count, to, {
      duration: 1.8,
      ease: 'easeOut',
      onUpdate: (v) => {
        if (!ref.current) return
        const n = Math.round(v)
        // Preserve Swiss thousands format (1.200) for values >= 1000
        const formatted = n >= 1000
          ? `${Math.floor(n / 1000)}.${String(n % 1000).padStart(3, '0')}`
          : String(n)
        ref.current.textContent = formatted + suffix
      },
    })
    return controls.stop
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView])

  // Initial display while not yet in view (avoids flash of "0")
  return <span ref={ref}>{display}</span>
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const t = useTranslations('hero')

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -80])
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -50])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const stats = [
    { display: '1.200+', to: 1200, suffix: '+', label: t('stats.smiles') },
    { display: '15+',    to: 15,   suffix: '+', label: t('stats.years') },
    { display: '98%',    to: 98,   suffix: '%', label: t('stats.satisfaction') },
  ]

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
          className="absolute top-1/4 -left-20 w-125 h-125 rounded-full bg-olive/10 blur-[130px]"
        />
        <motion.div
          style={{ y: orbY2 }}
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-1/4 -right-20 w-105 h-105 rounded-full bg-gold/8 blur-[110px]"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-2/3 left-1/3 w-70 h-70 rounded-full bg-beige/5 blur-[80px]"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          className="absolute top-10 right-1/4 w-50 h-50 rounded-full bg-gold/5 blur-[60px]"
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

      {/* Content */}
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
                {t('badge')}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={blurIn}
              className="font-display font-bold text-white leading-[1.04] tracking-tight mb-8"
              style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}
            >
              {t('headline1')}
              <span
                className="block"
                style={{
                  background: 'linear-gradient(135deg, #C8A96B 0%, #E8DCCB 50%, #C8A96B 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {t('headline2')}
              </span>
              <motion.span variants={fadeUp} className="block">
                {t('headline3')}
              </motion.span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="max-w-xl mx-auto lg:mx-0 text-white/50 text-lg lg:text-xl leading-relaxed mb-12"
            >
              {t('subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-16 lg:mb-0"
            >
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex px-8 py-4 bg-olive text-white text-[11px] tracking-[0.25em] uppercase font-semibold rounded-full hover:bg-olive-light transition-colors duration-300 hover:shadow-2xl hover:shadow-olive/35"
                >
                  {t('ctaPrimary')}
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                <Link
                  href="/dental"
                  className="inline-flex px-8 py-4 border border-white/15 text-white/80 text-[11px] tracking-[0.25em] uppercase font-medium rounded-full hover:bg-white/8 hover:border-white/30 transition-all duration-300"
                >
                  {t('ctaSecondary')}
                </Link>
              </motion.div>
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
                    <CountUp to={stat.to} suffix={stat.suffix} display={stat.display} />
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
                <p className="font-display text-2xl font-bold text-gold leading-none mb-1">
                  <CountUp to={1200} suffix="+" display="1.200+" />
                </p>
                <p className="text-white/40 text-[9px] tracking-[0.2em] uppercase">{t('stats.smiles')}</p>
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
                <CountUp to={stat.to} suffix={stat.suffix} display={stat.display} />
              </p>
              <p className="text-white/35 text-[10px] tracking-[0.2em] uppercase">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-white/20 text-[8px] tracking-[0.5em] uppercase">{t('scroll')}</span>
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
