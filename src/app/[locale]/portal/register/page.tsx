'use client'

import { useState, useTransition } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

interface FormState {
  firstName: string; lastName: string; email: string
  password: string; confirmPassword: string
  phone: string; gdprConsent: boolean
}

const EMPTY: FormState = {
  firstName: '', lastName: '', email: '',
  password: '', confirmPassword: '', phone: '', gdprConsent: false,
}

export default function RegisterPage() {
  const params = useParams()
  const locale = params.locale as string
  const router = useRouter()

  const [form, setForm] = useState<FormState>(EMPTY)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [isPending, startTransition] = useTransition()

  const set = (field: keyof FormState, value: string | boolean) =>
    setForm(f => ({ ...f, [field]: value }))

  const handleSubmit = () => {
    setError('')
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setError('Tutti i campi obbligatori devono essere compilati.')
      return
    }
    if (form.password !== form.confirmPassword) {
      setError('Le password non coincidono.')
      return
    }
    if (form.password.length < 8) {
      setError('La password deve avere almeno 8 caratteri.')
      return
    }
    if (!form.gdprConsent) {
      setError('Devi accettare il trattamento dei dati per procedere.')
      return
    }
    startTransition(async () => {
      try {
        const res = await fetch('/api/portal/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password,
            phone: form.phone || undefined,
            preferredLocale: locale,
            gdprConsent: form.gdprConsent,
          }),
        })
        const data = await res.json()
        if (!res.ok) {
          setError(data.error ?? 'Errore durante la registrazione')
          return
        }
        setSuccess(true)
      } catch {
        setError('Errore di rete. Riprova.')
      }
    })
  }

  if (success) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center px-6">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <circle cx="14" cy="14" r="12" stroke="#4ade80" strokeWidth="1.5"/>
              <path d="M9 14l3 3 7-7" stroke="#4ade80" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="font-display font-bold text-white text-2xl mb-3">Registrazione completata!</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            Controlla la tua email per il link di verifica. Una volta confermato, potrai accedere al portale.
          </p>
          <Link href={`/${locale}/portal/login`}
            className="inline-block px-8 py-3 bg-olive text-white text-[11px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive/80 transition-colors">
            Vai al Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-luxury-black flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-full bg-gold/20 border border-gold/30 flex items-center justify-center">
            <span className="font-display font-bold text-gold text-sm">LD</span>
          </div>
          <div>
            <p className="text-white font-display font-semibold text-sm leading-none">Luxury Dental</p>
            <p className="text-white/30 text-[11px]">Paradiso · Lugano</p>
          </div>
        </div>

        <h1 className="font-display font-bold text-white text-3xl mb-2">Crea il tuo account</h1>
        <p className="text-white/40 text-sm mb-8">Portale pazienti — accesso sicuro ai tuoi dati clinici.</p>

        <div className="grid grid-cols-2 gap-4">
          {/* Name fields */}
          {[
            { label: 'Nome *', field: 'firstName', type: 'text', placeholder: 'Marco' },
            { label: 'Cognome *', field: 'lastName', type: 'text', placeholder: 'Rossi' },
          ].map(({ label, field, type, placeholder }) => (
            <div key={field}>
              <label className="block text-white/40 text-[10px] tracking-[0.15em] uppercase mb-1.5">{label}</label>
              <input type={type} placeholder={placeholder}
                value={form[field as keyof FormState] as string}
                onChange={e => set(field as keyof FormState, e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors"
              />
            </div>
          ))}

          {/* Full-width fields */}
          {[
            { label: 'Email *', field: 'email', type: 'email', placeholder: 'email@esempio.com', full: true },
            { label: 'Password *', field: 'password', type: 'password', placeholder: 'Almeno 8 caratteri, maiusc., numero', full: true },
            { label: 'Conferma Password *', field: 'confirmPassword', type: 'password', placeholder: '···', full: true },
            { label: 'Telefono (opzionale)', field: 'phone', type: 'tel', placeholder: '+41 91 …', full: true },
          ].map(({ label, field, type, placeholder, full }) => (
            <div key={field} className={full ? 'col-span-2' : ''}>
              <label className="block text-white/40 text-[10px] tracking-[0.15em] uppercase mb-1.5">{label}</label>
              <input type={type} placeholder={placeholder}
                value={form[field as keyof FormState] as string}
                onChange={e => set(field as keyof FormState, e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors"
              />
            </div>
          ))}

          {/* GDPR */}
          <div className="col-span-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <div className={`w-5 h-5 rounded flex items-center justify-center border mt-0.5 shrink-0 transition-colors ${form.gdprConsent ? 'bg-olive border-olive' : 'bg-white/5 border-white/20 group-hover:border-white/30'}`}
                onClick={() => set('gdprConsent', !form.gdprConsent)}>
                {form.gdprConsent && (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
              <input type="checkbox" checked={form.gdprConsent} onChange={e => set('gdprConsent', e.target.checked)} className="sr-only" />
              <span className="text-white/40 text-xs leading-relaxed">
                Accetto il trattamento dei miei dati personali secondo il{' '}
                <a href="#" className="text-gold/70 hover:text-gold underline">Regolamento GDPR (Art. 6.1.a)</a>{' '}
                per la gestione della cartella clinica digitale. *
              </span>
            </label>
          </div>
        </div>

        {error && (
          <div className="mt-4 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button onClick={handleSubmit} disabled={isPending}
          className="w-full mt-6 py-4 bg-olive text-white text-[11px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive/80 disabled:opacity-50 transition-colors">
          {isPending ? 'Creazione account…' : 'Crea Account'}
        </button>

        <p className="mt-6 text-center text-white/30 text-sm">
          Hai già un account?{' '}
          <Link href={`/${locale}/portal/login`} className="text-gold/70 hover:text-gold transition-colors">
            Accedi
          </Link>
        </p>
      </div>
    </div>
  )
}
