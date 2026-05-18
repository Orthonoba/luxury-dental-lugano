'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade, A11y, Mousewheel } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/pagination'
import { stagger, fadeUp, blurIn, LUXURY_EASE } from '@/lib/animations'
import { TESTIMONIALS } from '@/data/testimonials'

function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="#C8A96B" className="w-4 h-4">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const swiperRef = useRef<SwiperType | null>(null)

  return (
    <section className="py-32 bg-luxury-black overflow-hidden relative">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold/20 to-transparent" />

      {/* Ambient background orb */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-olive/4 blur-[160px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-16"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.span
            variants={fadeUp}
            className="block text-gold text-[10px] tracking-[0.4em] uppercase font-medium mb-6"
          >
            Client Stories
          </motion.span>
          <motion.h2
            variants={blurIn}
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
        </motion.div>

        {/* Rating hero block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: LUXURY_EASE }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-16 p-8 rounded-3xl border border-white/6 bg-white/2 backdrop-blur-sm max-w-2xl mx-auto"
        >
          <div className="flex flex-col items-center">
            <span
              className="font-display font-bold text-white leading-none"
              style={{ fontSize: 'clamp(2.8rem, 5vw, 4rem)' }}
            >
              5.0
            </span>
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} viewBox="0 0 24 24" fill="#C8A96B" className="w-5 h-5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              ))}
            </div>
          </div>
          <div className="w-px h-14 bg-white/10 hidden sm:block" />
          <div className="flex flex-col items-center gap-1.5">
            <div className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" className="w-5 h-5">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-white text-sm font-semibold">Google Reviews</span>
            </div>
            <span className="text-white/30 text-[11px] tracking-[0.2em]">8 verified reviews</span>
          </div>
          <div className="w-px h-14 bg-white/10 hidden sm:block" />
          <div className="flex flex-col items-center">
            <span className="font-display font-bold text-white text-2xl">100%</span>
            <span className="text-white/35 text-[11px] tracking-[0.15em] uppercase">Recommended</span>
          </div>
        </motion.div>

        {/* Swiper testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: LUXURY_EASE }}
          className="max-w-3xl mx-auto"
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade, A11y, Mousewheel]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            mousewheel={{ enabled: true, forceToAxis: true }}
            autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-bullet-luxury',
              bulletActiveClass: 'swiper-bullet-luxury-active',
            }}
            loop
            speed={900}
            a11y={{ prevSlideMessage: 'Previous testimonial', nextSlideMessage: 'Next testimonial' }}
            onSwiper={(swiper) => { swiperRef.current = swiper }}
            className="luxury-testimonials-swiper"
          >
            {TESTIMONIALS.map((testimonial) => (
              <SwiperSlide key={testimonial.name}>
                <div className="relative bg-white/4 border border-white/8 rounded-3xl px-8 py-12 lg:px-12 lg:py-14 backdrop-blur-sm shadow-2xl shadow-black/20">
                  {/* Decorative quotation mark */}
                  <span
                    aria-hidden="true"
                    className="absolute -top-4 left-6 font-display text-[8rem] text-gold/10 leading-none select-none pointer-events-none"
                  >
                    &ldquo;
                  </span>

                  <div className="relative text-center">
                    {/* Stars */}
                    <div className="flex justify-center mb-8">
                      <StarRating count={testimonial.rating ?? 5} />
                    </div>

                    {/* Quote */}
                    <blockquote className="font-display text-xl lg:text-2xl font-medium text-white/90 leading-relaxed mb-10 italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center justify-center gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center border border-gold/30 bg-linear-to-br from-gold/20 to-olive/20 shrink-0">
                        <span className="text-gold font-semibold text-sm">{testimonial.avatar}</span>
                      </div>
                      <div className="text-left">
                        <p className="text-white font-semibold text-sm">{testimonial.name}</p>
                        <p className="text-white/35 text-xs tracking-wide">{testimonial.location}</p>
                      </div>
                      <div className="hidden sm:block w-px h-8 bg-white/10 mx-2" />
                      <span className="hidden sm:block text-gold/60 text-[10px] tracking-[0.2em] uppercase">
                        {testimonial.treatment}
                      </span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation arrows */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous testimonial"
              className="w-11 h-11 rounded-full border border-white/10 text-white/50 hover:border-gold/50 hover:text-gold transition-all duration-300 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </motion.button>

            {/* Swiper pagination renders here via CSS */}
            <div className="swiper-pagination-container flex gap-2" />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next testimonial"
              className="w-11 h-11 rounded-full border border-white/10 text-white/50 hover:border-gold/50 hover:text-gold transition-all duration-300 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Swiper CSS customisation — scoped to this section */}
      <style>{`
        .luxury-testimonials-swiper {
          overflow: visible;
        }
        .luxury-testimonials-swiper .swiper-wrapper {
          align-items: stretch;
        }
        .luxury-testimonials-swiper .swiper-pagination {
          position: static;
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          gap: 8px;
        }
        .swiper-bullet-luxury {
          display: inline-block;
          width: 8px;
          height: 6px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.2);
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .swiper-bullet-luxury-active {
          width: 32px;
          background: #C8A96B;
        }
      `}</style>
    </section>
  )
}
