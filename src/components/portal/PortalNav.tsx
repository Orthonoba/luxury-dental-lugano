'use client'

import { useState } from 'react'
import { usePathname, useRouter } from '@/navigation'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'

interface PortalNavProps {
  patientName: string
  locale: string
}

const NAV_ITEMS = [
  { key: 'dashboard', href: '/portal', icon: DashboardIcon },
  { key: 'treatments', href: '/portal/treatments', icon: TreatmentIcon },
  { key: 'appointments', href: '/portal/appointments', icon: CalendarIcon },
  { key: 'documents', href: '/portal/documents', icon: DocumentIcon },
  { key: 'payments', href: '/portal/payments', icon: PaymentIcon },
  { key: 'profile', href: '/portal/profile', icon: ProfileIcon },
] as const

export default function PortalNav({ patientName, locale }: PortalNavProps) {
  const t = useTranslations('portal.nav')
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  async function handleLogout() {
    setLoggingOut(true)
    await fetch('/api/portal/auth/logout', { method: 'POST' })
    router.push('/portal/login')
  }

  const isActive = (href: string) => {
    if (href === '/portal') return pathname === '/portal' || pathname === `/${locale}/portal`
    return pathname.includes(href.replace('/portal', ''))
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-luxury-black border-r border-white/8 fixed left-0 top-0 z-40">
        {/* Logo */}
        <div className="px-6 py-6 border-b border-white/8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0">
              <span className="font-display font-bold text-white text-xs">LD</span>
            </div>
            <div>
              <p className="text-white font-display font-semibold text-sm leading-none">Luxury Dental</p>
              <p className="text-white/30 text-[10px] mt-0.5 tracking-wider">Portal Paziente</p>
            </div>
          </div>
        </div>

        {/* Patient greeting */}
        <div className="px-6 py-4 border-b border-white/5">
          <p className="text-white/30 text-[10px] tracking-[0.15em] uppercase mb-1">{t('greeting')}</p>
          <p className="text-white/80 text-sm font-medium truncate">{patientName}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map(({ key, href, icon: Icon }) => (
            <Link
              key={key}
              href={href as '/portal'}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                isActive(href)
                  ? 'bg-olive/20 text-olive-light'
                  : 'text-white/45 hover:text-white/70 hover:bg-white/5'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive(href) ? 'text-olive-light' : 'text-white/30'}`} />
              {t(key as 'dashboard')}
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="px-3 pb-6">
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/30 hover:text-red-400/70 hover:bg-red-500/5 transition-colors"
          >
            <LogoutIcon className="w-4 h-4 shrink-0" />
            {loggingOut ? '...' : t('logout')}
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-luxury-black border-b border-white/8 px-4 py-3 flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center shrink-0">
          <span className="font-display font-bold text-white text-[10px]">LD</span>
        </div>
        <p className="text-white font-display font-semibold text-sm flex-1">Portal</p>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white/80"
          aria-label="Menu"
        >
          {mobileOpen ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-luxury-black/95 backdrop-blur-sm pt-16">
          <div className="px-4 py-6 space-y-1">
            <p className="text-white/30 text-[10px] tracking-[0.2em] uppercase px-3 mb-3">{patientName}</p>
            {NAV_ITEMS.map(({ key, href, icon: Icon }) => (
              <Link
                key={key}
                href={href as '/portal'}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-colors ${
                  isActive(href) ? 'bg-olive/20 text-olive-light' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                }`}
              >
                <Icon className={`w-5 h-5 shrink-0 ${isActive(href) ? 'text-olive-light' : 'text-white/30'}`} />
                {t(key as 'dashboard')}
              </Link>
            ))}
            <div className="pt-4 border-t border-white/8 mt-4">
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-white/30 hover:text-red-400/70"
              >
                <LogoutIcon className="w-5 h-5 shrink-0" />
                {t('logout')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// ── Icons ─────────────────────────────────────────────────────────────────

function DashboardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="9" y="1" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="1" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <rect x="9" y="9" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
    </svg>
  )
}

function TreatmentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 2C5.2 2 3 4.2 3 7c0 1.5.6 2.8 1.5 3.8L5 14h6l.5-3.2C12.4 9.8 13 8.5 13 7c0-2.8-2.2-5-5-5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M6 7h4M8 5v4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M5 2v2M11 2v2M2 7h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <circle cx="5.5" cy="10.5" r="0.8" fill="currentColor"/>
      <circle cx="8" cy="10.5" r="0.8" fill="currentColor"/>
      <circle cx="10.5" cy="10.5" r="0.8" fill="currentColor"/>
    </svg>
  )
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 2H4a1.5 1.5 0 00-1.5 1.5v9A1.5 1.5 0 004 14h8a1.5 1.5 0 001.5-1.5V6L9 2z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M9 2v4h4M5.5 9h5M5.5 11.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function PaymentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="1.5" y="4" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M1.5 7h13" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M4.5 10.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function ProfileIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="8" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M3 13.5c0-2.8 2.2-4.5 5-4.5s5 1.7 5 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function LogoutIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10.5 11L14 8l-3.5-3M14 8H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}
