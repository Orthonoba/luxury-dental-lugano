'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

export default function PortalLoginPage() {
  const t = useTranslations('portal.login')
  const router = useRouter()
  const params = useParams()
  const locale = (params?.locale as string) ?? 'it'
  const searchParams = useSearchParams()
  const from = searchParams.get('from') ?? `/${locale}/portal`

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) return
    setLoading(true)
    setError('')

    const res = await fetch('/api/portal/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.trim(), password, rememberMe }),
    })

    if (res.ok) {
      router.push(from as '/')
      router.refresh()
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? t('errorGeneric'))
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gold mx-auto flex items-center justify-center mb-4">
            <span className="font-display font-bold text-white text-sm">LD</span>
          </div>
          <h1 className="font-display text-white text-2xl font-semibold">{t('title')}</h1>
          <p className="text-white/40 text-sm mt-1">{t('subtitle')}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/50 text-xs tracking-[0.12em] uppercase mb-2">
              {t('email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="nome@email.com"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors"
            />
          </div>

          <div>
            <label className="block text-white/50 text-xs tracking-[0.12em] uppercase mb-2">
              {t('password')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-10 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? 'Nascondi password' : 'Mostra password'}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2"/><path d="M8 10a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.2"/><path d="M2 2l12 12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M1 8s2.5-5 7-5 7 5 7 5-2.5 5-7 5-7-5-7-5z" stroke="currentColor" strokeWidth="1.2"/><path d="M8 10a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.2"/></svg>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border border-white/20 bg-white/5 accent-olive"
              />
              <span className="text-white/40 text-xs">{t('rememberMe')}</span>
            </label>
            <Link
              href="/portal/forgot-password"
              className="text-xs text-gold/60 hover:text-gold transition-colors"
            >
              {t('forgotPassword')}
            </Link>
          </div>

          {error && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full py-3 bg-olive text-white text-[11px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? t('loading') : t('submit')}
          </button>
        </form>

        {/* Register link */}
        <p className="text-center text-white/30 text-sm mt-6">
          Non hai un account?{' '}
          <Link href="/portal/register" className="text-gold/70 hover:text-gold transition-colors">
            Registrati
          </Link>
        </p>

        {/* Back to site */}
        <div className="text-center mt-4">
          <Link
            href="/"
            className="text-white/25 text-xs hover:text-white/50 transition-colors"
          >
            ← {t('backToSite')}
          </Link>
        </div>
      </div>
    </div>
  )
}
