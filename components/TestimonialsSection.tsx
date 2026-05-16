'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'Isabella M.',
    location: 'Los Angeles, CA',
    treatment: 'Digital Smile Design',
    avatar: 'IM',
    text: 'The transformation is absolutely remarkable. Dr. Reyes and her team understood exactly what I envisioned. My smile is now my greatest confidence. The entire process was seamless and the result is beyond what I imagined.',
  },
  {
    name: 'Laurent B.',
    location: 'New York, NY',
    treatment: 'Porcelain Veneers',
    avatar: 'LB',
    text: 'I was nervous about veneers, but the team was incredibly professional and reassuring. The results are so natural — everyone keeps asking if I\'ve had work done. Truly the gold standard in cosmetic dentistry.',
  },
  {
    name: 'Valentina C.',
    location: 'Miami, FL',
    treatment: 'Clear Aligners',
    avatar: 'VC',
    text: 'After 14 months with clear aligners, my bite and smile are absolutely perfect. The digital planning was fascinating — seeing my result before starting was incredible. Professional, precise, and life-changing.',
  },
  {
    name: 'Marco A.',
    location: 'Beverly Hills, CA',
    treatment: 'Facial Aesthetics',
    avatar: 'MA',
    text: 'The facial rejuvenation treatment exceeded every expectation. The results are natural and beautifully subtle. My friends thought I had returned from a long vacation. Dr. Fontaine is a true artist.',
  },
  {
    name: 'Sophie L.',
    location: 'San Francisco, CA',
    treatment: 'Teeth Whitening',
    avatar: 'SL',
    text: 'Professional whitening in one session delivered results I had wanted for years. The clinic environment is stunning, the team is exceptional, and the results speak for themselves. Completely worth it.',
  },
]

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoplay])

  const goTo = (index: number) => {
    setCurrent(index)
    setAutoplay(false)
  }
  const prev = () => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length)
    setAutoplay(false)
  }
  const next = () => {
    setCurrent((c) => (c + 1) % testimonials.length)
    setAutoplay(false)
  }

  return (
    <section className="py-32 bg-luxury-black overflow-hidden">
      {/* Decorative */}
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

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
            transition={{ duration: 0.7 }}
            className="font-display font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
          >
            Words From
            <span
              className="block"
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

        {/* Testimonial */}
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1.5 mb-10">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    fill="#C8A96B"
                    className="w-5 h-5"
                  >
                    <path d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-display text-xl lg:text-2xl font-medium text-white/90 leading-relaxed mb-12 italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center border border-gold/30 bg-gradient-to-br from-gold/20 to-olive/20 shrink-0">
                  <span className="text-gold font-semibold text-sm">
                    {testimonials[current].avatar}
                  </span>
                </div>
                <div className="text-left">
                  <p className="text-white font-semibold text-sm">{testimonials[current].name}</p>
                  <p className="text-white/35 text-xs tracking-wide">{testimonials[current].location}</p>
                </div>
                <div className="hidden sm:block w-px h-8 bg-white/10 mx-2" />
                <span className="hidden sm:block text-gold/60 text-[10px] tracking-[0.2em] uppercase">
                  {testimonials[current].treatment}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-14">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-white/10 text-white/50 hover:border-gold/50 hover:text-gold transition-all duration-300 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
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
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
