'use client'

import { useState, useMemo, useTransition } from 'react'

interface PatientRow {
  id: string
  firstName: string
  lastName: string
  phone: string | null
  preferredLocale: string
  createdAt: string | Date
  user: { email: string; emailVerified: boolean; createdAt: string | Date }
  _count: { treatments: number; appointments: number; documents: number; payments: number }
  treatments: { status: string; title: string }[]
}

interface Props { patients: PatientRow[] }

interface NewPatientForm {
  firstName: string; lastName: string; email: string; password: string
  phone: string; preferredLocale: string; dateOfBirth: string; notes: string
}

const EMPTY_FORM: NewPatientForm = {
  firstName: '', lastName: '', email: '', password: '',
  phone: '', preferredLocale: 'it', dateOfBirth: '', notes: '',
}

const STATUS_COLORS: Record<string, string> = {
  PLANNED: 'text-blue-400 bg-blue-400/10',
  IN_PROGRESS: 'text-gold bg-gold/10',
  COMPLETED: 'text-green-400 bg-green-400/10',
  CANCELLED: 'text-red-400 bg-red-400/10',
}

export default function CRMPatientsClient({ patients: initial }: Props) {
  const [patients, setPatients] = useState(initial)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState<NewPatientForm>(EMPTY_FORM)
  const [formError, setFormError] = useState('')
  const [isPending, startTransition] = useTransition()

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return patients
    return patients.filter(p =>
      `${p.firstName} ${p.lastName}`.toLowerCase().includes(q) ||
      p.user.email.toLowerCase().includes(q) ||
      (p.phone ?? '').includes(q)
    )
  }, [patients, search])

  const formatDate = (d: string | Date) =>
    new Date(d).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' })

  const handleCreate = async () => {
    if (!form.firstName || !form.lastName || !form.email || !form.password) {
      setFormError('Nome, cognome, email e password sono obbligatori')
      return
    }
    setFormError('')
    startTransition(async () => {
      try {
        const res = await fetch('/api/crm/patients', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            ...form,
            dateOfBirth: form.dateOfBirth || undefined,
            notes: form.notes || undefined,
            phone: form.phone || undefined,
          }),
        })
        if (!res.ok) {
          const data = await res.json()
          setFormError(data.error ?? 'Errore durante la creazione')
          return
        }
        // Refresh page to get new patient data
        window.location.reload()
      } catch {
        setFormError('Errore di rete')
      }
    })
  }

  return (
    <div className="min-h-screen bg-luxury-black text-white">
      {/* Header */}
      <div className="border-b border-white/8 px-6 lg:px-10 py-5 flex items-center gap-4">
        <a href="/crm" className="text-white/30 hover:text-white/60 text-sm transition-colors">
          ← CRM
        </a>
        <span className="text-white/15">/</span>
        <div>
          <h1 className="font-display font-semibold text-white text-base leading-none">Pazienti Portal</h1>
          <p className="text-white/30 text-[11px] mt-0.5">{patients.length} pazienti registrati</p>
        </div>
        <button
          onClick={() => { setShowModal(true); setForm(EMPTY_FORM); setFormError('') }}
          className="ml-auto flex items-center gap-2 px-5 py-2.5 bg-olive rounded-full text-white text-[11px] tracking-[0.18em] uppercase font-semibold hover:bg-olive/80 transition-colors"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          Nuovo Paziente
        </button>
      </div>

      {/* Search */}
      <div className="px-6 lg:px-10 pt-6 pb-4">
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Cerca per nome, email, telefono…"
          className="w-full max-w-sm px-4 py-2.5 rounded-xl bg-white/4 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/30 transition-colors"
        />
        {search && <p className="text-white/30 text-xs mt-2">{filtered.length} risultat{filtered.length !== 1 ? 'i' : 'o'}</p>}
      </div>

      {/* Patient list */}
      <div className="px-6 lg:px-10 pb-12">
        {filtered.length === 0 ? (
          <div className="py-20 text-center text-white/20 text-sm">
            {search ? 'Nessun paziente trovato' : 'Nessun paziente ancora. Creane uno!'}
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map(p => {
              const latestTreatment = p.treatments[0]
              return (
                <a
                  key={p.id}
                  href={`/crm/patients/${p.id}`}
                  className="group flex items-center gap-5 p-5 rounded-2xl border border-white/6 hover:border-white/12 bg-white/2 hover:bg-white/4 transition-all"
                >
                  {/* Avatar */}
                  <div className="w-11 h-11 rounded-full bg-olive/20 border border-olive/30 flex items-center justify-center shrink-0">
                    <span className="font-display font-semibold text-olive text-sm">
                      {p.firstName[0]}{p.lastName[0]}
                    </span>
                  </div>

                  {/* Name + email */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm group-hover:text-gold/90 transition-colors">
                      {p.firstName} {p.lastName}
                    </p>
                    <p className="text-white/40 text-xs mt-0.5 truncate">{p.user.email}</p>
                  </div>

                  {/* Latest treatment */}
                  <div className="hidden md:block w-48 shrink-0">
                    {latestTreatment ? (
                      <div className="flex flex-col gap-1">
                        <span className={`text-[10px] tracking-[0.15em] uppercase font-medium px-2 py-0.5 rounded-full w-fit ${STATUS_COLORS[latestTreatment.status] ?? 'text-white/30 bg-white/5'}`}>
                          {latestTreatment.status.replace('_', ' ')}
                        </span>
                        <span className="text-white/40 text-xs truncate">{latestTreatment.title}</span>
                      </div>
                    ) : (
                      <span className="text-white/20 text-xs">Nessun trattamento</span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="hidden lg:flex items-center gap-5 shrink-0">
                    {[
                      { label: 'Tratt.', value: p._count.treatments },
                      { label: 'App.', value: p._count.appointments },
                      { label: 'Doc.', value: p._count.documents },
                    ].map(stat => (
                      <div key={stat.label} className="text-center">
                        <p className="text-white/70 text-sm font-semibold">{stat.value}</p>
                        <p className="text-white/25 text-[10px]">{stat.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Date + locale */}
                  <div className="text-right shrink-0 hidden sm:block">
                    <p className="text-white/30 text-[11px]">{formatDate(p.createdAt)}</p>
                    <p className="text-white/20 text-[10px] uppercase tracking-wider mt-0.5">{p.preferredLocale}</p>
                  </div>

                  <svg className="text-white/20 group-hover:text-white/40 transition-colors shrink-0" width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              )
            })}
          </div>
        )}
      </div>

      {/* Create patient modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display font-bold text-white text-xl">Nuovo Paziente</h2>
              <button onClick={() => setShowModal(false)} className="text-white/30 hover:text-white/60">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { field: 'firstName', label: 'Nome *', type: 'text', cols: 1 },
                { field: 'lastName', label: 'Cognome *', type: 'text', cols: 1 },
                { field: 'email', label: 'Email *', type: 'email', cols: 2 },
                { field: 'password', label: 'Password temporanea *', type: 'password', cols: 2 },
                { field: 'phone', label: 'Telefono', type: 'tel', cols: 1 },
                { field: 'dateOfBirth', label: 'Data di nascita', type: 'date', cols: 1 },
              ].map(({ field, label, type, cols }) => (
                <div key={field} className={cols === 2 ? 'col-span-2' : ''}>
                  <label className="block text-white/40 text-[10px] tracking-[0.15em] uppercase mb-1.5">{label}</label>
                  <input
                    type={type}
                    value={form[field as keyof NewPatientForm]}
                    onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/40 transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block text-white/40 text-[10px] tracking-[0.15em] uppercase mb-1.5">Lingua</label>
                <select
                  value={form.preferredLocale}
                  onChange={e => setForm(f => ({ ...f, preferredLocale: e.target.value }))}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-gold/40 transition-colors"
                >
                  {['it', 'en', 'es', 'de', 'fr'].map(l => (
                    <option key={l} value={l} className="bg-[#111]">{l.toUpperCase()}</option>
                  ))}
                </select>
              </div>

              <div className="col-span-2">
                <label className="block text-white/40 text-[10px] tracking-[0.15em] uppercase mb-1.5">Note interne</label>
                <textarea
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm resize-none focus:outline-none focus:border-gold/40 transition-colors"
                />
              </div>
            </div>

            {formError && <p className="mt-3 text-red-400 text-xs">{formError}</p>}

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-3 rounded-full border border-white/10 text-white/40 text-[11px] tracking-[0.15em] uppercase hover:border-white/20 hover:text-white/60 transition-colors"
              >
                Annulla
              </button>
              <button
                onClick={handleCreate}
                disabled={isPending}
                className="flex-1 py-3 rounded-full bg-olive text-white text-[11px] tracking-[0.18em] uppercase font-semibold hover:bg-olive/80 disabled:opacity-50 transition-colors"
              >
                {isPending ? 'Creazione…' : 'Crea Paziente'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
