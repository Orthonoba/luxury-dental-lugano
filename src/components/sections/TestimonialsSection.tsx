'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TESTIMONIALS } from '@/data/testimonials'

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [autoplay])

  const goTo = (index: number) => {
    setCurrent(index)
    setAutoplay(false)
  }
  const prev = () => {
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
    setAutoplay(false)
  }
  const next = () => {
    setCurrent((c) => (c + 1) % TESTIMONIALS.length)
    setAutoplay(false)
  }

  return (
    <section className="py-32 bg-luxury-black overflow-hidden relative">
      {/* Top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
          >
            Client Stories
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
          >
            Words From{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #C8A96B 0%, #E8DCCB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Our Clients
            </span>
          </motion.h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-white/4 border border-white/6 rounded-2xl px-8 py-12 lg:px-12 lg:py-14">
            {/* Decorative quotation mark */}
            <span
              aria-hidden="true"
              className="absolute -top-4 left-6 font-display text-[8rem] text-gold/10 leading-none select-none pointer-events-none"
            >
              &ldquo;
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative text-center"
              >
                {/* Stars */}
                <div className="flex justify-center gap-1.5 mb-8" aria-hidden="true">
                  {Array.from({ length: TESTIMONIALS[current].rating ?? 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" fill="#C8A96B" className="w-5 h-5">
                      <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="font-display text-xl lg:text-2xl font-medium text-white/90 leading-relaxed mb-10 italic">
                  &ldquo;{TESTIMONIALS[current].text}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center border border-gold/30 bg-linear-to-br from-gold/20 to-olive/20 shrink-0">
                    <span className="text-gold font-semibold text-sm">
                      {TESTIMONIALS[current].avatar}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="text-white font-semibold text-sm">{TESTIMONIALS[current].name}</p>
                    <p className="text-white/35 text-xs tracking-wide">{TESTIMONIALS[current].location}</p>
                  </div>
                  <div className="hidden sm:block w-px h-8 bg-white/10 mx-2" />
                  <span className="hidden sm:block text-gold/60 text-[10px] tracking-[0.2em] uppercase">
                    {TESTIMONIALS[current].treatment}
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-white/10 text-white/50 hover:border-gold/50 hover:text-gold transition-all duration-300 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonials">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  role="tab"
                  aria-selected={i === current}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    i === current ? 'bg-gold w-8' : 'bg-white/20 w-2 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-white/10 text-white/50 hover:border-gold/50 hover:text-gold transition-all duration-300 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>

          {/* Google Reviews Badge */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" fill="#C8A96B" className="w-3.5 h-3.5">
                  <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                </svg>
              ))}
            </div>
            <span className="text-white/30 text-[10px] tracking-[0.2em]">
              5.0 · Google Reviews · 8 valuations
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
