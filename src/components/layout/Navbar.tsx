'use client'

import { useState, useEffect, useRef } from 'react'
import { Link, usePathname, useRouter } from '@/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import { useScroll } from '@/hooks/useScroll'
import { cn } from '@/lib/utils'

type LocaleCode = 'IT' | 'EN' | 'ES' | 'DE' | 'FR'
const LOCALES: { code: LocaleCode; value: string; label: string }[] = [
  { code: 'IT', value: 'it', label: 'Italiano' },
  { code: 'EN', value: 'en', label: 'English' },
  { code: 'ES', value: 'es', label: 'Español' },
  { code: 'DE', value: 'de', label: 'Deutsch' },
  { code: 'FR', value: 'fr', label: 'Français' },
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
  const t = useTranslations('nav')

  const navLinks = [
    { href: '/' as const, label: t('home') },
    { href: '/about' as const, label: t('about') },
    { href: '/dental' as const, label: t('dental') },
    { href: '/facial-aesthetics' as const, label: t('facial') },
    { href: '/before-after' as const, label: t('gallery') },
    { href: '/team' as const, label: t('team') },
    { href: '/testimonials' as const, label: t('testimonials') },
    { href: '/blog' as const, label: t('blog') },
    { href: '/contact' as const, label: t('contact') },
  ]

  const currentLocale = LOCALES.find((l) => l.value === locale) ?? LOCALES[0]
  const isActive = (href: string) => pathname === href
  const switchLocale = (value: string) => {
    router.replace(pathname, { locale: value })
    setLangOpen(false)
  }

  // Close lang dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // iOS-safe body scroll lock: saves scroll position and restores on close
  useEffect(() => {
    if (!menuOpen) return
    const scrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'
    return () => {
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      window.scrollTo(0, scrollY)
    }
  }, [menuOpen])

  // Close menu on route change
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    if (menuOpen) setMenuOpen(false)
  }

  return (
    <>
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
              <div className="flex items-center gap-1.5 mt-0.5">
                <p className="text-[10px] tracking-[0.2em] text-white/50">& Facial Estética</p>
                <svg width="14" height="10" viewBox="0 0 14 10" xmlns="http://www.w3.org/2000/svg" aria-label="Switzerland" role="img" className="opacity-70 shrink-0">
                  <rect width="14" height="10" fill="#D52B1E" rx="1"/>
                  <rect x="6" y="1" width="2" height="8" fill="#FFFFFF"/>
                  <rect x="3" y="3.5" width="8" height="3" fill="#FFFFFF"/>
                </svg>
              </div>
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
            {/* Language Switcher */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors duration-300 group"
                aria-label="Cambia lingua"
                aria-expanded={langOpen}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="opacity-60 group-hover:opacity-100 transition-opacity"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <span className="text-[10px] tracking-[0.18em] uppercase font-semibold">
                  {currentLocale.code}
                </span>
                <motion.svg
                  width="9"
                  height="9"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ rotate: langOpen ? 180 : 0 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </motion.svg>
              </button>

              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-full right-0 mt-3 bg-[#0a0d06]/96 backdrop-blur-2xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 min-w-[152px] p-1.5"
                  >
                    {LOCALES.map((loc) => (
                      <button
                        key={loc.value}
                        onClick={() => switchLocale(loc.value)}
                        className={cn(
                          'w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all duration-200',
                          loc.value === locale
                            ? 'bg-gold/15 text-gold'
                            : 'text-white/50 hover:text-white hover:bg-white/6'
                        )}
                      >
                        <span
                          className={cn(
                            'text-[10px] tracking-[0.18em] uppercase font-bold w-5',
                            loc.value === locale ? 'text-gold' : 'text-white/40'
                          )}
                        >
                          {loc.code}
                        </span>
                        <span className="text-[11px] leading-none">{loc.label}</span>
                        {loc.value === locale && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book CTA */}
            <Link
              href="/contact"
              className="inline-flex items-center px-6 py-2.5 bg-olive text-white text-[10px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light transition-all duration-300 hover:shadow-lg hover:shadow-olive/25 hover:-translate-y-px whitespace-nowrap"
            >
              {t('bookNow')}
            </Link>
          </div>

          {/* Mobile / Tablet Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="xl:hidden flex flex-col justify-center gap-[5px] w-8 h-8 relative z-10"
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu di navigazione'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
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
      </motion.header>

      {/* ─── Mobile Menu — fixed overlay outside <header> ─────────────────────
          Backdrop + slide panel are siblings of the header, not children.
          This avoids the scroll-inside-fixed-height bug: the panel now
          occupies top-20 → bottom-0 of the viewport with overflow-y-auto.
      ──────────────────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop — click to close */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-30 xl:hidden bg-black/50"
              aria-hidden="true"
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-down panel */}
            <motion.div
              key="mobile-panel"
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Menù di navigazione"
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-20 left-0 right-0 bottom-0 z-40 xl:hidden bg-[#0a0d06]/97 backdrop-blur-2xl border-t border-white/8 overflow-y-auto"
              style={{ WebkitOverflowScrolling: 'touch' }}
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
                        'block text-[11px] tracking-[0.2em] uppercase font-medium transition-colors py-2.5 border-b border-white/5',
                        isActive(link.href) ? 'text-gold' : 'text-white/60 hover:text-white'
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Mobile language pills + CTA */}
                <div className="flex items-center justify-between mt-4 pt-6 border-t border-white/8">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {LOCALES.map((loc) => (
                      <button
                        key={loc.value}
                        onClick={() => switchLocale(loc.value)}
                        className={cn(
                          'text-[9px] tracking-[0.15em] uppercase font-bold px-3 py-1.5 rounded-full border transition-all duration-200',
                          loc.value === locale
                            ? 'border-gold bg-gold/15 text-gold'
                            : 'border-white/15 text-white/40 hover:border-white/30 hover:text-white/70 hover:bg-white/4'
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
                    {t('bookNow')}
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
