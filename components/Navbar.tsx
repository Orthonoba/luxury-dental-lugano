'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { href: '#philosophy', label: 'Philosophy' },
  { href: '#dental', label: 'Dental' },
  { href: '#facial', label: 'Facial' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#team', label: 'Team' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-xl shadow-sm border-b border-beige/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center shrink-0">
            <span className="font-display font-bold text-white text-sm tracking-wide">LD</span>
          </div>
          <div className={`transition-colors duration-400 ${scrolled ? 'text-luxury-black' : 'text-white'}`}>
            <p className="font-display text-sm font-semibold tracking-wide leading-none">
              Luxury Dental
            </p>
            <p className="text-[10px] tracking-[0.2em] opacity-60 mt-0.5">& Facial Estética</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[11px] tracking-[0.2em] uppercase font-medium transition-colors duration-300 hover:text-gold ${
                scrolled ? 'text-luxury-black/60' : 'text-white/70'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          className="hidden lg:inline-flex items-center px-6 py-2.5 bg-gold text-white text-[11px] tracking-[0.2em] uppercase font-medium rounded-full hover:bg-gold-light transition-all duration-300 hover:shadow-lg hover:shadow-gold/25 hover:-translate-y-px"
        >
          Book Now
        </a>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
          aria-label="Toggle navigation menu"
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`block h-px w-6 origin-center transition-colors duration-300 ${scrolled ? 'bg-luxury-black' : 'bg-white'}`}
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className={`block h-px w-6 transition-colors duration-300 ${scrolled ? 'bg-luxury-black' : 'bg-white'}`}
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`block h-px w-6 origin-center transition-colors duration-300 ${scrolled ? 'bg-luxury-black' : 'bg-white'}`}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden bg-white border-t border-beige/60"
          >
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-luxury-black/60 text-[11px] tracking-[0.2em] uppercase font-medium hover:text-gold transition-colors"
                >
                  {link.label}
                </motion.a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 text-center py-3 px-6 bg-gold text-white text-[11px] tracking-[0.2em] uppercase font-medium rounded-full hover:bg-gold-light transition-colors"
              >
                Book Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
