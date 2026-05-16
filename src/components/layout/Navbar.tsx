'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useScroll } from '@/hooks/useScroll'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/about', label: 'About' },
  { href: '/dental', label: 'Dental' },
  { href: '/facial-aesthetics', label: 'Facial' },
  { href: '/before-after', label: 'Gallery' },
  { href: '/team', label: 'Team' },
  { href: '/contact', label: 'Contact' },
]

const locales = ['IT', 'EN', 'DE', 'FR'] as const

export default function Navbar() {
  const scrolled = useScroll(60)
  const [menuOpen, setMenuOpen] = useState(false)
  const [currentLocale, setCurrentLocale] = useState<(typeof locales)[number]>('IT')
  const pathname = usePathname()

  const getActivePath = (path: string) =>
    path.replace(/^\/(en|de|fr)/, '') || '/'

  const isActive = (href: string) => getActivePath(pathname) === href

  const cycleLocale = () => {
    const idx = locales.indexOf(currentLocale)
    setCurrentLocale(locales[(idx + 1) % locales.length])
  }

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-[#0a0d06]/85 backdrop-blur-xl border-b border-white/8 shadow-lg shadow-black/20'
          : 'bg-transparent'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-9 h-9 rounded-full bg-gold flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
            <span className="font-display font-bold text-white text-sm tracking-wide">LD</span>
          </div>
          <div className="text-white">
            <p className="font-display text-sm font-semibold tracking-wide leading-none">
              Luxury Dental
            </p>
            <p className="text-[10px] tracking-[0.2em] text-white/50 mt-0.5">& Facial Estética</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-[11px] tracking-[0.2em] uppercase font-medium transition-all duration-300 relative group',
                isActive(link.href) ? 'text-gold' : 'text-white/65 hover:text-white'
              )}
            >
              {link.label}
              {isActive(link.href) && (
                <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-gold rounded-full" />
              )}
              <span className="absolute -bottom-0.5 left-0 right-0 h-px bg-white/0 group-hover:bg-white/30 transition-all duration-300 rounded-full" />
            </Link>
          ))}
        </div>

        {/* Desktop Right Side */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Language Selector */}
          <button
            onClick={cycleLocale}
            className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors duration-300"
            aria-label="Change language"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="text-[10px] tracking-[0.15em] uppercase font-medium">
              {currentLocale}
            </span>
          </button>

          {/* Book Now CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-2.5 bg-olive text-white text-[11px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-lg hover:shadow-olive/25 hover:-translate-y-px"
          >
            Book Now
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <motion.span
            animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block h-px w-6 origin-center bg-white"
          />
          <motion.span
            animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
            className="block h-px w-6 bg-white"
          />
          <motion.span
            animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.25 }}
            className="block h-px w-6 origin-center bg-white"
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
            className="lg:hidden overflow-hidden bg-[#0a0d06]/95 backdrop-blur-xl border-t border-white/8"
          >
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'block text-[11px] tracking-[0.2em] uppercase font-medium transition-colors',
                      isActive(link.href) ? 'text-gold' : 'text-white/60 hover:text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Language & CTA */}
              <div className="flex items-center justify-between mt-2 pt-5 border-t border-white/8">
                <button
                  onClick={cycleLocale}
                  className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  <span className="text-[10px] tracking-[0.15em] uppercase font-medium">{currentLocale}</span>
                </button>
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="py-3 px-7 bg-olive text-white text-[11px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
