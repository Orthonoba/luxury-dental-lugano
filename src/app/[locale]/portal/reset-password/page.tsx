'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Link } from '@/navigation'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

export default function ResetPasswordPage() {
  const t = useTranslations('portal.resetPassword')
  const router = useRouter()
  const params = useParams()
  const locale = (params?.locale as string) ?? 'it'
  const searchParams = useSearchParams()
  const token = searchParams.get('token') ?? ''

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  if (!token) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-white/50 text-sm mb-4">{t('invalidToken')}</p>
          <Link href="/portal/forgot-password" className="text-gold/60 hover:text-gold text-sm transition-colors">
            {t('requestNew')}
          </Link>
        </div>
      </div>
    )
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password !== confirm) {
      setError(t('passwordMismatch'))
      return
    }
    if (password.length < 8) {
      setError(t('passwordTooShort'))
      return
    }
    setLoading(true)
    setError('')

    const res = await fetch('/api/portal/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password }),
    })

    if (res.ok) {
      setDone(true)
      setTimeout(() => router.push(`/${locale}/portal/login`), 2500)
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error ?? t('errorGeneric'))
      setLoading(false)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-olive/20 border border-olive/30 mx-auto flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-olive-light">
              <path d="M4 10l4 4 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p className="text-white/70 text-sm">{t('successMessage')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gold mx-auto flex items-center justify-center mb-4">
            <span className="font-display font-bold text-white text-sm">LD</span>
          </div>
          <h1 className="font-display text-white text-2xl font-semibold">{t('title')}</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white/50 text-xs tracking-[0.12em] uppercase mb-2">
              {t('newPassword')}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Minimo 8 caratteri"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors"
            />
          </div>

          <div>
            <label className="block text-white/50 text-xs tracking-[0.12em] uppercase mb-2">
              {t('confirmPassword')}
            </label>
            <input
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors"
            />
          </div>

          {error && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !password || !confirm}
            className="w-full py-3 bg-olive text-white text-[11px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light disabled:opacity-50 transition-colors"
          >
            {loading ? t('loading') : t('submit')}
          </button>
        </form>
      </div>
    </div>
  )
}
