'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'

const cases = [
  {
    id: 1,
    treatment: 'Digital Smile Design',
    description: 'Complete smile makeover with porcelain veneers',
    beforeBg: 'from-stone-200 via-stone-300 to-stone-400',
    afterBg: 'from-amber-50 via-yellow-50 to-white',
  },
  {
    id: 2,
    treatment: 'Porcelain Veneers',
    description: 'Full arch porcelain veneer placement',
    beforeBg: 'from-slate-200 via-slate-300 to-slate-400',
    afterBg: 'from-orange-50 via-amber-50 to-yellow-50',
  },
  {
    id: 3,
    treatment: 'Teeth Whitening',
    description: 'Professional in-office whitening session',
    beforeBg: 'from-yellow-100 via-yellow-200 to-yellow-300',
    afterBg: 'from-white via-gray-50 to-slate-50',
  },
]

function ComparisonSlider({
  beforeBg,
  afterBg,
  label,
}: {
  beforeBg: string
  afterBg: string
  label: string
}) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const getPercent = useCallback((clientX: number) => {
    if (!containerRef.current) return 50
    const { left, width } = containerRef.current.getBoundingClientRect()
    return Math.min(100, Math.max(0, ((clientX - left) / width) * 100))
  }, [])

  const handleMouseDown = useCallback(() => {
    dragging.current = true
    const onMove = (e: MouseEvent) => {
      if (dragging.current) setPosition(getPercent(e.clientX))
    }
    const onUp = () => {
      dragging.current = false
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [getPercent])

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      setPosition(getPercent(e.touches[0].clientX))
    },
    [getPercent]
  )

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 5
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        setPosition((p) => Math.max(0, p - step))
        break
      case 'ArrowRight':
        e.preventDefault()
        setPosition((p) => Math.min(100, p + step))
        break
      case 'Home':
        e.preventDefault()
        setPosition(0)
        break
      case 'End':
        e.preventDefault()
        setPosition(100)
        break
    }
  }, [])

  return (
    <div
      ref={containerRef}
      role="slider"
      tabIndex={0}
      aria-label={`${label} — before and after comparison`}
      aria-valuenow={Math.round(position)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`${Math.round(position)}% before`}
      className="relative h-80 rounded-2xl overflow-hidden cursor-col-resize select-none touch-none focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
      onMouseDown={handleMouseDown}
      onTouchMove={handleTouchMove}
      onKeyDown={handleKeyDown}
    >
      {/* After layer (base) */}
      <div className={`absolute inset-0 bg-linear-to-br ${afterBg} flex flex-col items-center justify-center`}>
        <div className="text-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-white/70 mx-auto mb-3 flex items-center justify-center shadow-sm">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-gold">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
          </div>
          <p className="text-luxury-black/40 text-[10px] tracking-[0.3em] uppercase">After</p>
          <p className="text-luxury-black font-display font-bold text-xl mt-1">Transformed</p>
        </div>
      </div>

      {/* Before layer (clipped) */}
      <div
        className={`absolute inset-0 bg-linear-to-br ${beforeBg} flex flex-col items-center justify-center`}
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <div className="text-center pointer-events-none">
          <div className="w-14 h-14 rounded-full bg-white/30 mx-auto mb-3 flex items-center justify-center">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6 text-luxury-black/30">
              <circle cx="12" cy="12" r="9" />
            </svg>
          </div>
          <p className="text-luxury-black/30 text-[10px] tracking-[0.3em] uppercase">Before</p>
          <p className="text-luxury-black/50 font-display font-bold text-xl mt-1">Original</p>
        </div>
      </div>

      {/* Divider */}
      <div
        aria-hidden="true"
        className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_12px_rgba(255,255,255,0.8)] z-10 pointer-events-none"
        style={{ left: `${position}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white shadow-2xl shadow-black/20 flex items-center justify-center border border-white/80">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} className="w-5 h-5 text-luxury-black/60">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div aria-hidden="true" className="absolute bottom-4 left-4 px-3 py-1 rounded-full bg-luxury-black/40 backdrop-blur-sm pointer-events-none">
        <span className="text-white/80 text-[9px] tracking-[0.2em] uppercase">Before</span>
      </div>
      <div aria-hidden="true" className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-gold/80 backdrop-blur-sm pointer-events-none">
        <span className="text-white text-[9px] tracking-[0.2em] uppercase">After</span>
      </div>
    </div>
  )
}

export default function BeforeAfterGallery() {
  return (
    <section id="gallery" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
          >
            Real Results
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-display font-bold text-luxury-black leading-tight mb-6"
            style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)' }}
          >
            Transformations
            <span className="block text-olive italic font-medium">That Speak</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-luxury-black/45 max-w-md mx-auto text-sm leading-relaxed"
          >
            Drag or use arrow keys to reveal each transformation. Every result reflects our commitment to
            precision and natural beauty.
          </motion.p>
        </div>

        {/* Sliders grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((c, index) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="group"
            >
              <div className="overflow-hidden rounded-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-olive/10">
                <ComparisonSlider
                  beforeBg={c.beforeBg}
                  afterBg={c.afterBg}
                  label={c.treatment}
                />
              </div>
              <div className="mt-5">
                <p className="font-display font-semibold text-luxury-black text-lg group-hover:text-olive transition-colors duration-300">
                  {c.treatment}
                </p>
                <p className="text-luxury-black/40 text-xs tracking-wide mt-1">{c.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
