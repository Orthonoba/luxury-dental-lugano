'use client'

import { useState, useTransition } from 'react'

type StepStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED'
type TreatmentStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'NO_SHOW'
type PaymentStatus = 'PENDING' | 'PAID' | 'PARTIAL' | 'OVERDUE' | 'CANCELLED'

interface Step { id: string; title: string; status: StepStatus; order: number; scheduledAt?: string; completedAt?: string; description?: string }
interface Treatment { id: string; title: string; type: string; status: TreatmentStatus; progress: number; doctorName?: string; totalCost?: number; currency: string; startDate?: string; estimatedEnd?: string; description?: string; steps: Step[] }
interface Appointment { id: string; title: string; status: AppointmentStatus; scheduledAt: string; duration: number; doctorName?: string; notes?: string; type: string }
interface Document { id: string; name: string; type: string; description?: string; mimeType?: string; fileSize?: number; createdAt: string; uploadedBy?: string }
interface Payment { id: string; amount: number; currency: string; status: PaymentStatus; method?: string; description?: string; paidAt?: string; createdAt: string }
interface Patient {
  id: string; firstName: string; lastName: string; phone?: string; preferredLocale: string
  dateOfBirth?: string; notes?: string; createdAt: string
  user: { id: string; email: string; emailVerified: boolean; role: string; createdAt: string }
  treatments: Treatment[]; appointments: Appointment[]; documents: Document[]; payments: Payment[]
}

const STATUS_LABEL: Record<string, string> = {
  PLANNED: 'Pianificato', IN_PROGRESS: 'In corso', COMPLETED: 'Completato', CANCELLED: 'Annullato',
  PENDING: 'In attesa', SKIPPED: 'Saltato', SCHEDULED: 'Programmato', CONFIRMED: 'Confermato',
  NO_SHOW: 'Non presentato', PAID: 'Pagato', PARTIAL: 'Parziale', OVERDUE: 'Scaduto',
}
const STATUS_COLOR: Record<string, string> = {
  PLANNED: 'text-blue-400 bg-blue-400/10',
  IN_PROGRESS: 'text-gold bg-gold/10',
  COMPLETED: 'text-green-400 bg-green-400/10',
  CANCELLED: 'text-red-400 bg-red-400/10',
  PENDING: 'text-white/40 bg-white/5',
  SKIPPED: 'text-white/20 bg-white/4',
  SCHEDULED: 'text-blue-400 bg-blue-400/10',
  CONFIRMED: 'text-gold bg-gold/10',
  NO_SHOW: 'text-red-400 bg-red-400/10',
  PAID: 'text-green-400 bg-green-400/10',
  PARTIAL: 'text-yellow-400 bg-yellow-400/10',
  OVERDUE: 'text-red-400 bg-red-400/10',
}

const formatDate = (d?: string) => d ? new Date(d).toLocaleDateString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—'
const formatDateTime = (d?: string) => d ? new Date(d).toLocaleString('it-IT', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'
const formatCurrency = (n: number, c = 'CHF') => `${c} ${n.toLocaleString('it-IT', { minimumFractionDigits: 2 })}`

type Tab = 'overview' | 'treatments' | 'appointments' | 'documents' | 'payments'

export default function CRMPatientDetailClient({ patient: initial }: { patient: Patient }) {
  const [patient, setPatient] = useState(initial)
  const [tab, setTab] = useState<Tab>('overview')
  const [isPending, startTransition] = useTransition()
  const [notification, setNotification] = useState('')

  // ── Add treatment modal ─────────────────────────────────────────────────────
  const [showTreatmentModal, setShowTreatmentModal] = useState(false)
  const [tForm, setTForm] = useState({ title: '', type: 'OTHER', description: '', doctorName: '', totalCost: '', startDate: '', estimatedEnd: '' })

  // ── Add appointment modal ────────────────────────────────────────────────────
  const [showApptModal, setShowApptModal] = useState(false)
  const [aForm, setAForm] = useState({ title: '', type: 'dental', doctorName: '', scheduledAt: '', duration: '60', notes: '' })

  // ── Upload document modal ────────────────────────────────────────────────────
  const [showDocModal, setShowDocModal] = useState(false)
  const [docFile, setDocFile] = useState<File | null>(null)
  const [docMeta, setDocMeta] = useState({ type: 'OTHER', name: '', description: '' })

  // ── Add payment modal ────────────────────────────────────────────────────────
  const [showPayModal, setShowPayModal] = useState(false)
  const [pForm, setPForm] = useState({ amount: '', currency: 'CHF', status: 'PENDING', method: '', description: '' })

  const notify = (msg: string) => { setNotification(msg); setTimeout(() => setNotification(''), 3000) }

  const reload = () => window.location.reload()

  const handleAddTreatment = () => startTransition(async () => {
    const res = await fetch(`/api/crm/patients/${patient.id}/treatments`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...tForm, totalCost: tForm.totalCost ? Number(tForm.totalCost) : undefined }),
    })
    if (res.ok) { notify('Trattamento creato!'); setShowTreatmentModal(false); reload() }
    else notify('Errore nella creazione del trattamento')
  })

  const handleAddAppt = () => startTransition(async () => {
    const res = await fetch(`/api/crm/patients/${patient.id}/appointments`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...aForm, duration: Number(aForm.duration) }),
    })
    if (res.ok) { notify('Appuntamento creato!'); setShowApptModal(false); reload() }
    else notify('Errore nella creazione appuntamento')
  })

  const handleUploadDoc = () => startTransition(async () => {
    if (!docFile) return
    const fd = new FormData()
    fd.append('file', docFile)
    fd.append('type', docMeta.type)
    fd.append('name', docMeta.name || docFile.name)
    fd.append('description', docMeta.description)
    fd.append('uploadedBy', 'staff@luxurydental.ch')
    const res = await fetch(`/api/crm/patients/${patient.id}/documents`, {
      method: 'POST', credentials: 'include', body: fd,
    })
    if (res.ok) { notify('Documento caricato!'); setShowDocModal(false); reload() }
    else notify('Errore nel caricamento documento')
  })

  const handleAddPayment = () => startTransition(async () => {
    const res = await fetch(`/api/crm/patients/${patient.id}/payments`, {
      method: 'POST', credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...pForm, amount: Number(pForm.amount) }),
    })
    if (res.ok) { notify('Pagamento registrato!'); setShowPayModal(false); reload() }
    else notify('Errore nella registrazione pagamento')
  })

  const updateTreatmentProgress = (treatmentId: string, progress: number) =>
    startTransition(async () => {
      await fetch(`/api/crm/treatments/${treatmentId}`, {
        method: 'PATCH', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress }),
      })
      notify('Progresso aggiornato')
      reload()
    })

  const updateStepStatus = (treatmentId: string, stepId: string, status: StepStatus) =>
    startTransition(async () => {
      await fetch(`/api/crm/treatments/${treatmentId}`, {
        method: 'PATCH', credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stepId, stepStatus: status }),
      })
      notify('Fase aggiornata')
      reload()
    })

  const totalPaid = patient.payments.filter(p => p.status === 'PAID').reduce((s, p) => s + p.amount, 0)
  const totalPending = patient.payments.filter(p => ['PENDING', 'PARTIAL', 'OVERDUE'].includes(p.status)).reduce((s, p) => s + p.amount, 0)

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'treatments', label: 'Trattamenti', count: patient.treatments.length },
    { id: 'appointments', label: 'Appuntamenti', count: patient.appointments.length },
    { id: 'documents', label: 'Documenti', count: patient.documents.length },
    { id: 'payments', label: 'Pagamenti', count: patient.payments.length },
  ]

  return (
    <div className="min-h-screen bg-luxury-black text-white">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 px-5 py-3 rounded-xl bg-green-500/20 border border-green-500/30 text-green-400 text-sm">
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-white/8 px-6 lg:px-10 py-5 flex flex-wrap items-center gap-3">
        <a href="/crm/patients" className="text-white/30 hover:text-white/60 text-sm transition-colors">← Pazienti</a>
        <span className="text-white/15">/</span>
        <div className="flex items-center gap-3 flex-1">
          <div className="w-10 h-10 rounded-full bg-olive/20 border border-olive/30 flex items-center justify-center">
            <span className="font-display font-semibold text-olive text-sm">{patient.firstName[0]}{patient.lastName[0]}</span>
          </div>
          <div>
            <h1 className="font-display font-semibold text-white text-base">{patient.firstName} {patient.lastName}</h1>
            <p className="text-white/30 text-[11px]">{patient.user.email}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/8 px-6 lg:px-10 flex gap-1 overflow-x-auto">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 py-4 px-1 text-[11px] tracking-[0.18em] uppercase font-medium border-b-2 transition-colors mr-6 whitespace-nowrap ${
              tab === t.id ? 'border-gold text-gold' : 'border-transparent text-white/40 hover:text-white/70'
            }`}
          >
            {t.label}
            {t.count !== undefined && (
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${tab === t.id ? 'bg-gold/20 text-gold' : 'bg-white/8 text-white/30'}`}>{t.count}</span>
            )}
          </button>
        ))}
      </div>

      <div className="px-6 lg:px-10 py-8">
        {/* ── OVERVIEW ─────────────────────────────────────────────────── */}
        {tab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-white/3 border border-white/6 rounded-2xl p-6">
                <h3 className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-4">Dati Personali</h3>
                <dl className="space-y-3">
                  {[
                    ['Nome', `${patient.firstName} ${patient.lastName}`],
                    ['Email', patient.user.email],
                    ['Telefono', patient.phone ?? '—'],
                    ['Data di nascita', formatDate(patient.dateOfBirth)],
                    ['Lingua', patient.preferredLocale.toUpperCase()],
                    ['Registrato il', formatDate(patient.createdAt)],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4">
                      <dt className="text-white/30 text-sm">{k}</dt>
                      <dd className="text-white/80 text-sm text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              {patient.notes && (
                <div className="bg-white/3 border border-white/6 rounded-2xl p-6">
                  <h3 className="text-white/40 text-[10px] tracking-[0.2em] uppercase mb-3">Note Interne</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{patient.notes}</p>
                </div>
              )}
            </div>
            <div className="space-y-4">
              {[
                { label: 'Incassato', value: formatCurrency(totalPaid), color: 'text-green-400' },
                { label: 'Da incassare', value: formatCurrency(totalPending), color: 'text-gold' },
                { label: 'Trattamenti attivi', value: patient.treatments.filter(t => t.status === 'IN_PROGRESS').length, color: 'text-white' },
                { label: 'Prossimi appuntamenti', value: patient.appointments.filter(a => new Date(a.scheduledAt) >= new Date() && a.status !== 'CANCELLED').length, color: 'text-white' },
              ].map(s => (
                <div key={s.label} className="bg-white/3 border border-white/6 rounded-2xl p-5 flex justify-between items-center">
                  <span className="text-white/40 text-sm">{s.label}</span>
                  <span className={`text-2xl font-display font-bold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── TREATMENTS ───────────────────────────────────────────────── */}
        {tab === 'treatments' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-semibold">Trattamenti</h2>
              <button onClick={() => setShowTreatmentModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-olive rounded-full text-white text-[11px] tracking-[0.15em] uppercase hover:bg-olive/80 transition-colors">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Aggiungi
              </button>
            </div>
            <div className="space-y-4">
              {patient.treatments.map(t => (
                <div key={t.id} className="bg-white/3 border border-white/6 rounded-2xl p-6">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className={`text-[10px] tracking-[0.15em] uppercase font-medium px-2 py-0.5 rounded-full ${STATUS_COLOR[t.status]}`}>
                        {STATUS_LABEL[t.status]}
                      </span>
                      <h3 className="text-white font-semibold mt-2">{t.title}</h3>
                      {t.doctorName && <p className="text-white/40 text-sm">{t.doctorName}</p>}
                    </div>
                    {t.totalCost && (
                      <p className="text-gold font-display font-bold text-lg shrink-0">{formatCurrency(t.totalCost, t.currency)}</p>
                    )}
                  </div>

                  {/* Progress slider */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-white/30 mb-1.5">
                      <span>Progresso</span><span>{t.progress}%</span>
                    </div>
                    <input type="range" min={0} max={100} step={5} defaultValue={t.progress}
                      onMouseUp={e => updateTreatmentProgress(t.id, Number((e.target as HTMLInputElement).value))}
                      onTouchEnd={e => updateTreatmentProgress(t.id, Number((e.target as HTMLInputElement).value))}
                      className="w-full accent-[var(--color-olive)] cursor-pointer"
                    />
                  </div>

                  {/* Steps */}
                  {t.steps.length > 0 && (
                    <div className="space-y-2 mt-4 border-t border-white/5 pt-4">
                      <p className="text-white/30 text-[10px] tracking-[0.15em] uppercase mb-3">Fasi Trattamento</p>
                      {t.steps.map(s => (
                        <div key={s.id} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full shrink-0 ${s.status === 'COMPLETED' ? 'bg-green-400' : s.status === 'IN_PROGRESS' ? 'bg-gold' : 'bg-white/20'}`} />
                          <span className="text-white/60 text-sm flex-1">{s.title}</span>
                          <select
                            defaultValue={s.status}
                            onChange={e => updateStepStatus(t.id, s.id, e.target.value as StepStatus)}
                            className="text-[10px] bg-white/5 border border-white/10 text-white/50 rounded-lg px-2 py-1 focus:outline-none"
                          >
                            {['PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED'].map(st => (
                              <option key={st} value={st} className="bg-[#111]">{STATUS_LABEL[st]}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {patient.treatments.length === 0 && (
                <p className="text-white/20 text-center py-12">Nessun trattamento ancora</p>
              )}
            </div>
          </div>
        )}

        {/* ── APPOINTMENTS ─────────────────────────────────────────────── */}
        {tab === 'appointments' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-semibold">Appuntamenti</h2>
              <button onClick={() => setShowApptModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-olive rounded-full text-white text-[11px] tracking-[0.15em] uppercase hover:bg-olive/80 transition-colors">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Aggiungi
              </button>
            </div>
            <div className="space-y-3">
              {patient.appointments.map(a => (
                <div key={a.id} className="flex items-center gap-4 p-4 bg-white/3 border border-white/6 rounded-xl">
                  <div className="text-center shrink-0 w-14">
                    <p className="text-white font-bold text-lg leading-none">{new Date(a.scheduledAt).getDate()}</p>
                    <p className="text-white/30 text-[11px] uppercase">{new Date(a.scheduledAt).toLocaleDateString('it-IT', { month: 'short' })}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{a.title}</p>
                    <p className="text-white/30 text-xs mt-0.5">
                      {new Date(a.scheduledAt).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })} · {a.duration} min
                      {a.doctorName ? ` · ${a.doctorName}` : ''}
                    </p>
                  </div>
                  <span className={`text-[10px] tracking-[0.12em] uppercase font-medium px-2.5 py-1 rounded-full ${STATUS_COLOR[a.status]}`}>
                    {STATUS_LABEL[a.status]}
                  </span>
                </div>
              ))}
              {patient.appointments.length === 0 && <p className="text-white/20 text-center py-12">Nessun appuntamento ancora</p>}
            </div>
          </div>
        )}

        {/* ── DOCUMENTS ────────────────────────────────────────────────── */}
        {tab === 'documents' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white font-semibold">Documenti</h2>
              <button onClick={() => { setShowDocModal(true); setDocFile(null); setDocMeta({ type: 'OTHER', name: '', description: '' }) }}
                className="flex items-center gap-2 px-4 py-2 bg-olive rounded-full text-white text-[11px] tracking-[0.15em] uppercase hover:bg-olive/80 transition-colors">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Carica
              </button>
            </div>
            <div className="space-y-3">
              {patient.documents.map(d => (
                <div key={d.id} className="flex items-center gap-4 p-4 bg-white/3 border border-white/6 rounded-xl">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="text-white/40">
                      <rect x="3" y="1" width="10" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                      <path d="M7 5h5M7 8h5M7 11h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{d.name}</p>
                    <p className="text-white/30 text-xs mt-0.5">
                      {d.type} · {d.fileSize ? `${(d.fileSize / 1024).toFixed(1)} KB` : '—'} · {formatDate(d.createdAt)}
                    </p>
                  </div>
                  <span className="text-[10px] tracking-[0.12em] uppercase text-white/30 border border-white/10 px-2 py-0.5 rounded-full shrink-0">
                    {d.type}
                  </span>
                </div>
              ))}
              {patient.documents.length === 0 && <p className="text-white/20 text-center py-12">Nessun documento ancora</p>}
            </div>
          </div>
        )}

        {/* ── PAYMENTS ─────────────────────────────────────────────────── */}
        {tab === 'payments' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white font-semibold">Pagamenti</h2>
              <button onClick={() => setShowPayModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-olive rounded-full text-white text-[11px] tracking-[0.15em] uppercase hover:bg-olive/80 transition-colors">
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                Registra
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-green-400/5 border border-green-400/15 rounded-2xl p-5">
                <p className="text-white/40 text-xs mb-1">Totale Incassato</p>
                <p className="text-green-400 font-display font-bold text-2xl">{formatCurrency(totalPaid)}</p>
              </div>
              <div className="bg-gold/5 border border-gold/15 rounded-2xl p-5">
                <p className="text-white/40 text-xs mb-1">Da Incassare</p>
                <p className="text-gold font-display font-bold text-2xl">{formatCurrency(totalPending)}</p>
              </div>
            </div>
            <div className="space-y-3">
              {patient.payments.map(p => (
                <div key={p.id} className="flex items-center gap-4 p-4 bg-white/3 border border-white/6 rounded-xl">
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{p.description ?? '—'}</p>
                    <p className="text-white/30 text-xs mt-0.5">
                      {p.method ?? '—'} · {p.paidAt ? `Pagato il ${formatDate(p.paidAt)}` : `Creato il ${formatDate(p.createdAt)}`}
                    </p>
                  </div>
                  <span className={`text-[10px] tracking-[0.12em] uppercase font-medium px-2.5 py-1 rounded-full shrink-0 ${STATUS_COLOR[p.status]}`}>
                    {STATUS_LABEL[p.status]}
                  </span>
                  <p className="text-white font-semibold text-base shrink-0">{formatCurrency(p.amount, p.currency)}</p>
                </div>
              ))}
              {patient.payments.length === 0 && <p className="text-white/20 text-center py-12">Nessun pagamento ancora</p>}
            </div>
          </div>
        )}
      </div>

      {/* ── Modals ────────────────────────────────────────────────────────────── */}
      {showTreatmentModal && (
        <Modal title="Nuovo Trattamento" onClose={() => setShowTreatmentModal(false)} onSave={handleAddTreatment} saving={isPending}>
          <FieldGroup fields={[
            { label: 'Titolo *', field: 'title', type: 'text', full: true },
            { label: 'Tipo', field: 'type', type: 'select', options: ['IMPLANTOLOGY','ORTHODONTICS','AESTHETICS','WHITENING','PERIODONTICS','ENDODONTICS','FACIAL_AESTHETICS','OTHER'] },
            { label: 'Dottore', field: 'doctorName', type: 'text' },
            { label: 'Costo totale (CHF)', field: 'totalCost', type: 'number' },
            { label: 'Inizio', field: 'startDate', type: 'date' },
            { label: 'Fine stimata', field: 'estimatedEnd', type: 'date' },
            { label: 'Descrizione', field: 'description', type: 'textarea', full: true },
          ]} values={tForm} onChange={(f, v) => setTForm(x => ({ ...x, [f]: v }))} />
        </Modal>
      )}

      {showApptModal && (
        <Modal title="Nuovo Appuntamento" onClose={() => setShowApptModal(false)} onSave={handleAddAppt} saving={isPending}>
          <FieldGroup fields={[
            { label: 'Titolo *', field: 'title', type: 'text', full: true },
            { label: 'Data e ora *', field: 'scheduledAt', type: 'datetime-local', full: true },
            { label: 'Tipo', field: 'type', type: 'select', options: ['dental', 'facial'] },
            { label: 'Durata (min)', field: 'duration', type: 'number' },
            { label: 'Dottore', field: 'doctorName', type: 'text', full: true },
            { label: 'Note', field: 'notes', type: 'textarea', full: true },
          ]} values={aForm} onChange={(f, v) => setAForm(x => ({ ...x, [f]: v }))} />
        </Modal>
      )}

      {showDocModal && (
        <Modal title="Carica Documento" onClose={() => setShowDocModal(false)} onSave={handleUploadDoc} saving={isPending}>
          <div className="space-y-4">
            <div>
              <label className="block text-white/40 text-[10px] tracking-[0.15em] uppercase mb-1.5">File *</label>
              <input type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={e => { const f = e.target.files?.[0]; if (f) { setDocFile(f); if (!docMeta.name) setDocMeta(m => ({ ...m, name: f.name })) }}}
                className="w-full text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-[11px] file:bg-olive/20 file:text-olive/80 hover:file:bg-olive/30"
              />
            </div>
            <FieldGroup fields={[
              { label: 'Tipo', field: 'type', type: 'select', options: ['BUDGET','REPORT','XRAY','PHOTO','CONTRACT','OTHER'] },
              { label: 'Nome file', field: 'name', type: 'text' },
              { label: 'Descrizione', field: 'description', type: 'textarea', full: true },
            ]} values={docMeta} onChange={(f, v) => setDocMeta(x => ({ ...x, [f]: v }))} />
          </div>
        </Modal>
      )}

      {showPayModal && (
        <Modal title="Registra Pagamento" onClose={() => setShowPayModal(false)} onSave={handleAddPayment} saving={isPending}>
          <FieldGroup fields={[
            { label: 'Importo (CHF) *', field: 'amount', type: 'number' },
            { label: 'Stato', field: 'status', type: 'select', options: ['PENDING','PAID','PARTIAL','OVERDUE'] },
            { label: 'Metodo', field: 'method', type: 'select', options: ['card','bank_transfer','cash','other'] },
            { label: 'Valuta', field: 'currency', type: 'text' },
            { label: 'Descrizione', field: 'description', type: 'textarea', full: true },
          ]} values={pForm} onChange={(f, v) => setPForm(x => ({ ...x, [f]: v }))} />
        </Modal>
      )}
    </div>
  )
}

// ── Shared sub-components ─────────────────────────────────────────────────────

function Modal({ title, children, onClose, onSave, saving }: {
  title: string; children: React.ReactNode
  onClose: () => void; onSave: () => void; saving: boolean
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display font-bold text-white text-xl">{title}</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white/60">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
        {children}
        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-3 rounded-full border border-white/10 text-white/40 text-[11px] tracking-[0.15em] uppercase hover:border-white/20 hover:text-white/60 transition-colors">
            Annulla
          </button>
          <button onClick={onSave} disabled={saving}
            className="flex-1 py-3 rounded-full bg-olive text-white text-[11px] tracking-[0.18em] uppercase font-semibold hover:bg-olive/80 disabled:opacity-50 transition-colors">
            {saving ? 'Salvataggio…' : 'Salva'}
          </button>
        </div>
      </div>
    </div>
  )
}

function FieldGroup({ fields, values, onChange }: {
  fields: { label: string; field: string; type: string; full?: boolean; options?: string[] }[]
  values: Record<string, string>; onChange: (field: string, value: string) => void
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {fields.map(({ label, field, type, full, options }) => (
        <div key={field} className={full ? 'col-span-2' : ''}>
          <label className="block text-white/40 text-[10px] tracking-[0.15em] uppercase mb-1.5">{label}</label>
          {type === 'select' ? (
            <select value={values[field] ?? ''} onChange={e => onChange(field, e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-gold/40 transition-colors">
              {options?.map(o => <option key={o} value={o} className="bg-[#111]">{o}</option>)}
            </select>
          ) : type === 'textarea' ? (
            <textarea rows={2} value={values[field] ?? ''} onChange={e => onChange(field, e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm resize-none focus:outline-none focus:border-gold/40 transition-colors" />
          ) : (
            <input type={type} value={values[field] ?? ''} onChange={e => onChange(field, e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-gold/40 transition-colors" />
          )}
        </div>
      ))}
    </div>
  )
}
