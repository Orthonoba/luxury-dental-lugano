'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

interface ProfileData {
  id: string
  firstName: string
  lastName: string
  phone: string | null
  dateOfBirth: string | null
  preferredLocale: string
  user: { email: string }
}

const LOCALES = [
  { code: 'it', label: 'Italiano' },
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
]

export default function ProfilePage() {
  const t = useTranslations('portal.profile')
  const params = useParams()

  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState('')

  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirm: '' })
  const [pwLoading, setPwLoading] = useState(false)
  const [pwSuccess, setPwSuccess] = useState(false)
  const [pwError, setPwError] = useState('')

  const [gdprDeleting, setGdprDeleting] = useState(false)
  const [gdprConfirm, setGdprConfirm] = useState(false)

  useEffect(() => {
    fetch('/api/portal/profile')
      .then((r) => r.json())
      .then((data) => {
        setProfile(data)
        setLoading(false)
      })
  }, [])

  async function handleSaveProfile(e: React.FormEvent) {
    e.preventDefault()
    if (!profile) return
    setSaving(true)
    setSaveSuccess(false)
    setSaveError('')

    const res = await fetch('/api/portal/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone || null,
        preferredLocale: profile.preferredLocale,
      }),
    })

    if (res.ok) {
      setSaveSuccess(true)
      setTimeout(() => setSaveSuccess(false), 3000)
    } else {
      const d = await res.json().catch(() => ({}))
      setSaveError(d.error ?? t('saveError'))
    }
    setSaving(false)
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault()
    if (pwForm.newPassword !== pwForm.confirm) {
      setPwError(t('passwordMismatch'))
      return
    }
    if (pwForm.newPassword.length < 8) {
      setPwError(t('passwordTooShort'))
      return
    }
    setPwLoading(true)
    setPwError('')
    setPwSuccess(false)

    const res = await fetch('/api/portal/profile', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword }),
    })

    if (res.ok) {
      setPwSuccess(true)
      setPwForm({ currentPassword: '', newPassword: '', confirm: '' })
      setTimeout(() => setPwSuccess(false), 3000)
    } else {
      const d = await res.json().catch(() => ({}))
      setPwError(d.error ?? t('saveError'))
    }
    setPwLoading(false)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="h-40 bg-white/4 border border-white/8 rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  if (!profile) return null

  return (
    <div className="space-y-6">
      <div>
        <p className="text-white/40 text-[11px] tracking-[0.2em] uppercase">{t('section')}</p>
        <h1 className="font-display text-white text-2xl font-semibold mt-1">{t('title')}</h1>
      </div>

      {/* Profile form */}
      <form onSubmit={handleSaveProfile} className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-4">
        <h2 className="text-white/50 text-xs tracking-[0.15em] uppercase">{t('personalData')}</h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">{t('firstName')}</label>
            <input
              value={profile.firstName}
              onChange={(e) => setProfile((p) => p ? { ...p, firstName: e.target.value } : p)}
              required
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">{t('lastName')}</label>
            <input
              value={profile.lastName}
              onChange={(e) => setProfile((p) => p ? { ...p, lastName: e.target.value } : p)}
              required
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold/30 transition-colors"
            />
          </div>
          <div>
            <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">{t('email')}</label>
            <input
              value={profile.user.email}
              readOnly
              className="w-full px-3 py-2.5 bg-white/2 border border-white/6 rounded-xl text-white/30 text-sm cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">{t('phone')}</label>
            <input
              type="tel"
              value={profile.phone ?? ''}
              onChange={(e) => setProfile((p) => p ? { ...p, phone: e.target.value || null } : p)}
              placeholder="+41 91 000 0000"
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/30 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">{t('language')}</label>
          <select
            value={profile.preferredLocale}
            onChange={(e) => setProfile((p) => p ? { ...p, preferredLocale: e.target.value } : p)}
            className="w-full sm:w-48 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold/30"
          >
            {LOCALES.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
        </div>

        {saveSuccess && <p className="text-olive-light text-xs">{t('saveSuccess')}</p>}
        {saveError && <p className="text-red-400 text-xs">{saveError}</p>}

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-olive text-white text-[11px] tracking-[0.15em] uppercase font-semibold rounded-full hover:bg-olive-light disabled:opacity-50 transition-colors"
        >
          {saving ? t('saving') : t('save')}
        </button>
      </form>

      {/* Change password */}
      <form onSubmit={handleChangePassword} className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-4">
        <h2 className="text-white/50 text-xs tracking-[0.15em] uppercase">{t('changePassword')}</h2>

        <div className="space-y-3">
          {[
            { key: 'currentPassword', label: t('currentPassword'), autoComplete: 'current-password' },
            { key: 'newPassword', label: t('newPassword'), autoComplete: 'new-password' },
            { key: 'confirm', label: t('confirmPassword'), autoComplete: 'new-password' },
          ].map(({ key, label, autoComplete }) => (
            <div key={key}>
              <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">{label}</label>
              <input
                type="password"
                value={pwForm[key as keyof typeof pwForm]}
                onChange={(e) => setPwForm((f) => ({ ...f, [key]: e.target.value }))}
                required
                autoComplete={autoComplete}
                placeholder="••••••••"
                className="w-full sm:w-80 px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/30 transition-colors"
              />
            </div>
          ))}
        </div>

        {pwSuccess && <p className="text-olive-light text-xs">{t('passwordChanged')}</p>}
        {pwError && <p className="text-red-400 text-xs">{pwError}</p>}

        <button
          type="submit"
          disabled={pwLoading}
          className="px-6 py-2.5 bg-white/8 border border-white/10 text-white/60 text-[11px] tracking-[0.15em] uppercase font-semibold rounded-full hover:bg-white/12 hover:text-white/80 disabled:opacity-50 transition-colors"
        >
          {pwLoading ? t('saving') : t('changePasswordBtn')}
        </button>
      </form>
      {/* GDPR Section */}
      <div className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-4">
        <h2 className="text-white/50 text-xs tracking-[0.15em] uppercase">Privacy &amp; GDPR</h2>

        {/* Data export */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-white/70 text-sm font-medium">Esporta i miei dati</p>
            <p className="text-white/30 text-xs mt-0.5">Scarica una copia JSON di tutti i tuoi dati clinici (GDPR Art. 20)</p>
          </div>
          <a
            href="/api/portal/gdpr/export"
            download
            className="shrink-0 px-5 py-2 rounded-full border border-white/10 text-white/50 text-[11px] tracking-[0.15em] uppercase hover:border-white/20 hover:text-white/70 transition-colors"
          >
            Esporta
          </a>
        </div>

        <div className="border-t border-white/6 pt-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-red-400 text-sm font-medium">Elimina il mio account</p>
              <p className="text-white/30 text-xs mt-0.5">
                Cancella permanentemente tutti i tuoi dati (GDPR Art. 17 — Diritto alla cancellazione)
              </p>
            </div>
            <button
              onClick={() => setGdprConfirm(true)}
              className="shrink-0 px-5 py-2 rounded-full border border-red-500/20 text-red-400/70 text-[11px] tracking-[0.15em] uppercase hover:border-red-500/40 hover:text-red-400 transition-colors"
            >
              Elimina
            </button>
          </div>

          {gdprConfirm && (
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
              <p className="text-red-300 text-sm font-medium mb-2">Sei assolutamente sicuro/a?</p>
              <p className="text-red-300/70 text-xs mb-4">
                Questa azione è irreversibile. Tutti i tuoi dati (trattamenti, appuntamenti, documenti, pagamenti) saranno cancellati permanentemente.
              </p>
              <div className="flex gap-3">
                <button onClick={() => setGdprConfirm(false)}
                  className="px-4 py-2 rounded-full border border-white/10 text-white/40 text-[11px] uppercase hover:text-white/60 transition-colors">
                  Annulla
                </button>
                <button
                  onClick={async () => {
                    setGdprDeleting(true)
                    const res = await fetch('/api/portal/gdpr/delete', {
                      method: 'DELETE',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ confirm: 'DELETE_MY_DATA' }),
                    })
                    if (res.ok) window.location.href = '/'
                    else setGdprDeleting(false)
                  }}
                  disabled={gdprDeleting}
                  className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-300 text-[11px] uppercase hover:bg-red-500/30 disabled:opacity-50 transition-colors"
                >
                  {gdprDeleting ? 'Eliminazione…' : 'Sì, elimina tutto'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
