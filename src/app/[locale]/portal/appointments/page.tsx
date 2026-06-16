'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'

interface Appointment {
  id: string
  title: string
  type: string
  status: AppointmentStatus
  doctorName: string | null
  scheduledAt: string
  duration: number
  notes: string | null
}

function statusBadge(status: AppointmentStatus) {
  const map: Record<AppointmentStatus, string> = {
    SCHEDULED: 'text-gold bg-gold/10 border-gold/20',
    CONFIRMED: 'text-olive-light bg-olive/10 border-olive/20',
    COMPLETED: 'text-white/40 bg-white/5 border-white/10',
    CANCELLED: 'text-red-400 bg-red-500/10 border-red-500/20',
    NO_SHOW: 'text-red-400/60 bg-red-500/8 border-red-500/15',
  }
  return map[status]
}

export default function AppointmentsPage() {
  const t = useTranslations('portal.appointments')
  const params = useParams()
  const locale = (params?.locale as string) ?? 'it'

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [formSuccess, setFormSuccess] = useState(false)

  const [form, setForm] = useState({
    title: '',
    type: 'dental' as 'dental' | 'facial',
    desiredDate: '',
    desiredTime: '',
    notes: '',
  })

  useEffect(() => {
    fetch('/api/portal/appointments')
      .then((r) => r.json())
      .then(setAppointments)
      .finally(() => setLoading(false))
  }, [])

  const now = new Date()
  const upcoming = appointments.filter((a) => new Date(a.scheduledAt) >= now && a.status !== 'CANCELLED')
  const past = appointments.filter((a) => new Date(a.scheduledAt) < now || a.status === 'COMPLETED' || a.status === 'CANCELLED')

  async function handleRequest(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setFormError('')
    const res = await fetch('/api/portal/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      const appt = await res.json()
      setAppointments((prev) => [appt, ...prev])
      setFormSuccess(true)
      setShowForm(false)
      setForm({ title: '', type: 'dental', desiredDate: '', desiredTime: '', notes: '' })
    } else {
      const d = await res.json().catch(() => ({}))
      setFormError(d.error ?? t('errorGeneric'))
    }
    setSubmitting(false)
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString(locale === 'it' ? 'it-IT' : locale, {
      weekday: 'short', day: '2-digit', month: 'long', year: 'numeric',
    })
  }

  function formatTime(dateStr: string) {
    return new Date(dateStr).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-20 bg-white/4 border border-white/8 rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-white/40 text-[11px] tracking-[0.2em] uppercase">{t('section')}</p>
          <h1 className="font-display text-white text-2xl font-semibold mt-1">{t('title')}</h1>
        </div>
        <button
          onClick={() => { setShowForm(!showForm); setFormSuccess(false) }}
          className="px-4 py-2 bg-olive text-white text-[11px] tracking-[0.15em] uppercase font-semibold rounded-full hover:bg-olive-light transition-colors"
        >
          {showForm ? t('cancel') : t('requestNew')}
        </button>
      </div>

      {formSuccess && (
        <div className="px-4 py-3 bg-olive/10 border border-olive/20 rounded-xl text-olive-light text-sm">
          {t('requestSuccess')}
        </div>
      )}

      {/* Request form */}
      {showForm && (
        <form onSubmit={handleRequest} className="bg-white/4 border border-white/8 rounded-2xl p-6 space-y-4">
          <h3 className="text-white/60 text-sm font-medium mb-2">{t('newRequest')}</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">{t('formTitle')}</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                required
                placeholder={t('formTitlePlaceholder')}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/30"
              />
            </div>
            <div>
              <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">{t('formType')}</label>
              <select
                value={form.type}
                onChange={(e) => setForm((f) => ({ ...f, type: e.target.value as 'dental' | 'facial' }))}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold/30"
              >
                <option value="dental">{t('typeDental')}</option>
                <option value="facial">{t('typeFacial')}</option>
              </select>
            </div>
            <div>
              <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">{t('formDate')}</label>
              <input
                type="date"
                value={form.desiredDate}
                onChange={(e) => setForm((f) => ({ ...f, desiredDate: e.target.value }))}
                required
                min={new Date().toISOString().split('T')[0]}
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold/30 [color-scheme:dark]"
              />
            </div>
            <div>
              <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">{t('formTime')}</label>
              <input
                type="time"
                value={form.desiredTime}
                onChange={(e) => setForm((f) => ({ ...f, desiredTime: e.target.value }))}
                required
                className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-gold/30 [color-scheme:dark]"
              />
            </div>
          </div>
          <div>
            <label className="block text-white/40 text-[10px] uppercase tracking-wider mb-1.5">{t('formNotes')}</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={2}
              placeholder={t('formNotesPlaceholder')}
              className="w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-gold/30 resize-none"
            />
          </div>
          {formError && <p className="text-red-400 text-xs">{formError}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2.5 bg-olive text-white text-[11px] tracking-[0.15em] uppercase font-semibold rounded-full hover:bg-olive-light disabled:opacity-50 transition-colors"
          >
            {submitting ? t('sending') : t('send')}
          </button>
        </form>
      )}

      {/* Upcoming */}
      {upcoming.length > 0 && (
        <div>
          <p className="text-white/40 text-[11px] tracking-[0.18em] uppercase mb-3">{t('upcoming')}</p>
          <div className="space-y-3">
            {upcoming.map((appt) => (
              <div key={appt.id} className="bg-white/4 border border-white/8 rounded-2xl p-5 flex items-start gap-4">
                <div className="shrink-0 text-center bg-olive/10 border border-olive/20 rounded-xl px-3 py-2.5 min-w-[52px]">
                  <p className="text-olive-light text-lg font-display font-semibold leading-none">
                    {new Date(appt.scheduledAt).getDate()}
                  </p>
                  <p className="text-white/30 text-[9px] uppercase tracking-wider mt-0.5">
                    {new Date(appt.scheduledAt).toLocaleDateString(locale === 'it' ? 'it-IT' : locale, { month: 'short' })}
                  </p>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-white/80 text-sm font-medium">{appt.title}</h3>
                    <span className={`shrink-0 text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full border ${statusBadge(appt.status)}`}>
                      {t(`status_${appt.status}` as 'status_SCHEDULED')}
                    </span>
                  </div>
                  <p className="text-white/35 text-xs mt-0.5">
                    {formatTime(appt.scheduledAt)} · {appt.duration} min
                    {appt.doctorName ? ` · ${appt.doctorName}` : ''}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Past */}
      {past.length > 0 && (
        <div>
          <p className="text-white/25 text-[11px] tracking-[0.18em] uppercase mb-3">{t('past')}</p>
          <div className="space-y-2">
            {past.slice(0, 10).map((appt) => (
              <div key={appt.id} className="bg-white/2 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                <div className="shrink-0 text-white/25 text-xs w-20 text-center">
                  {new Date(appt.scheduledAt).toLocaleDateString(locale === 'it' ? 'it-IT' : locale, { day: '2-digit', month: 'short' })}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/40 text-sm truncate">{appt.title}</p>
                </div>
                <span className={`shrink-0 text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full border ${statusBadge(appt.status)}`}>
                  {t(`status_${appt.status}` as 'status_SCHEDULED')}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {appointments.length === 0 && (
        <div className="bg-white/4 border border-white/8 rounded-2xl p-12 text-center">
          <p className="text-white/30 text-sm">{t('empty')}</p>
        </div>
      )}
    </div>
  )
}
