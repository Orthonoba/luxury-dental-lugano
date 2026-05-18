'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from '@/navigation'
import { useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { useScroll } from '@/hooks/useScroll'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/dental', label: 'Dental' },
  { href: '/facial-aesthetics', label: 'Facial' },
  { href: '/before-after', label: 'Gallery' },
  { href: '/team', label: 'Team' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

type LocaleCode = 'IT' | 'EN' | 'DE' | 'FR' | 'ES'
const LOCALES: { code: LocaleCode; value: string; label: string }[] = [
  { code: 'IT', value: 'it', label: 'Italiano' },
  { code: 'EN', value: 'en', label: 'English' },
  { code: 'DE', value: 'de', label: 'Deutsch' },
  { code: 'FR', value: 'fr', label: 'Français' },
  { code: 'ES', value: 'es', label: 'Español' },
]

export default function Navbar() {
  const scrolled = useScroll(60)
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const pathname = usePathname()
  const [prevPathname, setPrevPathname] = useState(pathname)
  const router = useRouter()
  const locale = useLocale()
  const langRef = useRef<HTMLDivElement>(null)

  const currentLocale = LOCALES.find((l) => l.value === locale) ?? LOCALES[0]

  const getActivePath = (path: string) => path.replace(/^\/(en|de|fr|es)/, '') || '/'
  const isActive = (href: string) => getActivePath(pathname) === href

  const switchLocale = (value: string) => {
    router.replace(pathname, { locale: value })
    setLangOpen(false)
  }

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    if (menuOpen) setMenuOpen(false)
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

        {/* Desktop Navigation — xl: and above */}
        <div className="hidden xl:flex items-center gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-[10px] tracking-[0.18em] uppercase font-medium transition-all duration-300 relative group whitespace-nowrap',
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

        {/* Desktop Right Side — xl: and above */}
        <div className="hidden xl:flex items-center gap-4">
          {/* Language Dropdown */}
          <div ref={langRef} className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors duration-300"
              aria-label="Change language"
              aria-expanded={langOpen}
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
                {currentLocale.code}
              </span>
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={cn('transition-transform duration-200', langOpen && 'rotate-180')}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>

            <AnimatePresence>
              {langOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-full right-0 mt-3 bg-[#0a0d06]/95 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/40 min-w-[140px]"
                >
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.value}
                      onClick={() => switchLocale(loc.value)}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-200',
                        loc.value === locale
                          ? 'text-gold bg-white/5'
                          : 'text-white/50 hover:text-white hover:bg-white/5'
                      )}
                    >
                      <span className="text-[10px] tracking-[0.15em] uppercase font-semibold w-6">
                        {loc.code}
                      </span>
                      <span className="text-[11px] text-white/40">{loc.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Book Consultation CTA */}
          <Link
            href="/contact"
            className="inline-flex items-center px-6 py-2.5 bg-olive text-white text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-lg hover:shadow-olive/25 hover:-translate-y-px whitespace-nowrap"
          >
            Book Consultation
          </Link>
        </div>

        {/* Mobile / Tablet Hamburger (shown below xl:) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="xl:hidden flex flex-col justify-center gap-[5px] w-8 h-8"
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

      {/* Mobile / Tablet Slide Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="xl:hidden overflow-hidden bg-[#0a0d06]/95 backdrop-blur-xl border-t border-white/8"
          >
            <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={cn(
                      'block text-[11px] tracking-[0.2em] uppercase font-medium transition-colors py-1',
                      isActive(link.href) ? 'text-gold' : 'text-white/60 hover:text-white'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Language & CTA */}
              <div className="flex items-center justify-between mt-3 pt-5 border-t border-white/8">
                {/* Language selector mobile */}
                <div className="flex items-center gap-2 flex-wrap">
                  {LOCALES.map((loc) => (
                    <button
                      key={loc.value}
                      onClick={() => switchLocale(loc.value)}
                      className={cn(
                        'text-[9px] tracking-[0.15em] uppercase font-semibold px-2.5 py-1 rounded-full border transition-colors duration-200',
                        loc.value === locale
                          ? 'border-gold text-gold'
                          : 'border-white/15 text-white/40 hover:border-white/30 hover:text-white/60'
                      )}
                    >
                      {loc.code}
                    </button>
                  ))}
                </div>
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="py-3 px-6 bg-olive text-white text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light transition-colors shrink-0"
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
