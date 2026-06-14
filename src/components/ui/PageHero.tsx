'use client'

import { motion } from 'framer-motion'

interface PageHeroProps {
  eyebrow: string
  title: string
  titleAccent?: string
  subtitle?: string
}

export default function PageHero({ eyebrow, title, titleAccent, subtitle }: PageHeroProps) {
  return (
    <section className="relative pt-40 pb-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0a0d06] via-[#141a0a] to-[#1e2810]" />

      {/* Ambient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-32 w-100 h-100 rounded-full bg-olive/10 blur-[100px]" />
        <div className="absolute bottom-0 -right-16 w-75 h-75 rounded-full bg-gold/8 blur-[80px]" />
      </div>

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(200,169,107,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,107,0.6) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
        >
          {eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display font-bold text-white leading-[1.06] tracking-tight"
          style={{ fontSize: 'clamp(2.6rem, 6vw, 5rem)' }}
        >
          {title}
          {titleAccent && (
            <span
              className="block"
              style={{
                background: 'linear-gradient(135deg, #556B2F 0%, #6B8A3C 50%, #C8A96B 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {titleAccent}
            </span>
          )}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 max-w-2xl text-white/45 text-lg leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
