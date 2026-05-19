'use client'

import { useState } from 'react'

interface PatientLead {
  id: string
  name: string
  email: string
  phone: string | null
  message: string | null
  createdAt: Date
}

interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: Date
}

interface Newsletter {
  id: string
  email: string
  locale: string
  createdAt: Date
}

interface CRMContentProps {
  authorized: boolean
  leads: PatientLead[]
  messages: ContactMessage[]
  subscribers: Newsletter[]
}

type Tab = 'leads' | 'messages' | 'subscribers'

export default function CRMContent({ authorized, leads, messages, subscribers }: CRMContentProps) {
  const [token, setToken] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [tab, setTab] = useState<Tab>('leads')

  const handleLogin = async () => {
    if (!token.trim()) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/crm/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })
      if (res.ok) {
        window.location.reload()
      } else {
        setError('Invalid token. Please try again.')
      }
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (!authorized) {
    return (
      <div className="min-h-screen bg-luxury-black flex items-center justify-center px-6">
        <div className="w-full max-w-sm bg-white/4 border border-white/8 rounded-2xl p-10">
          <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center mb-6">
            <span className="font-display font-bold text-white text-sm">LD</span>
          </div>
          <h1 className="text-white font-display font-bold text-2xl mb-2">CRM Access</h1>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            Enter your admin token to access the patient dashboard.
          </p>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Admin token"
            className="w-full px-4 py-3 rounded-xl bg-white/6 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-gold/40 transition-colors mb-4"
          />
          {error && (
            <p className="text-red-400 text-xs mb-4">{error}</p>
          )}
          <button
            onClick={handleLogin}
            disabled={loading || !token.trim()}
            className="w-full py-3 bg-olive text-white text-[11px] tracking-[0.2em] uppercase font-semibold rounded-full hover:bg-olive-light disabled:opacity-50 transition-colors"
          >
            {loading ? 'Verifying…' : 'Authenticate'}
          </button>
        </div>
      </div>
    )
  }

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'leads', label: 'Patient Leads', count: leads.length },
    { id: 'messages', label: 'Messages', count: messages.length },
    { id: 'subscribers', label: 'Newsletter', count: subscribers.length },
  ]

  const formatDate = (d: Date) =>
    new Date(d).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })

  return (
    <div className="min-h-screen bg-luxury-black text-white">
      {/* Header */}
      <div className="border-b border-white/8 px-6 lg:px-8 py-5 flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center shrink-0">
          <span className="font-display font-bold text-white text-xs">LD</span>
        </div>
        <div>
          <h1 className="font-display font-semibold text-white text-base leading-none">CRM Dashboard</h1>
          <p className="text-white/30 text-[11px] mt-0.5">Luxury Dental Paradiso</p>
        </div>
        <div className="ml-auto flex items-center gap-4 text-white/30 text-xs">
          <span>{leads.length} leads</span>
          <span>·</span>
          <span>{messages.length} messages</span>
          <span>·</span>
          <span>{subscribers.length} subscribers</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/8 px-6 lg:px-8 flex gap-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 py-4 px-1 text-[11px] tracking-[0.18em] uppercase font-medium border-b-2 transition-colors mr-6 ${
              tab === t.id
                ? 'border-gold text-gold'
                : 'border-transparent text-white/40 hover:text-white/70'
            }`}
          >
            {t.label}
            <span
              className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                tab === t.id ? 'bg-gold/20 text-gold' : 'bg-white/8 text-white/30'
              }`}
            >
              {t.count}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="px-6 lg:px-8 py-8 overflow-x-auto">
        {tab === 'leads' && (
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="text-white/25 text-[10px] tracking-[0.2em] uppercase">
                <th className="text-left pb-4 font-medium">Name</th>
                <th className="text-left pb-4 font-medium">Email</th>
                <th className="text-left pb-4 font-medium">Phone</th>
                <th className="text-left pb-4 font-medium">Message</th>
                <th className="text-left pb-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-white/20 text-sm">No leads yet</td>
                </tr>
              ) : (
                leads.map((l) => (
                  <tr key={l.id} className="border-t border-white/4 hover:bg-white/2 transition-colors">
                    <td className="py-3.5 pr-6 text-white/80 text-sm font-medium whitespace-nowrap">{l.name}</td>
                    <td className="py-3.5 pr-6 text-white/55 text-sm">{l.email}</td>
                    <td className="py-3.5 pr-6 text-white/35 text-sm whitespace-nowrap">{l.phone ?? '—'}</td>
                    <td className="py-3.5 pr-6 text-white/35 text-sm max-w-xs">
                      <span className="block truncate">{l.message ?? '—'}</span>
                    </td>
                    <td className="py-3.5 text-white/25 text-xs whitespace-nowrap">{formatDate(l.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {tab === 'messages' && (
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="text-white/25 text-[10px] tracking-[0.2em] uppercase">
                <th className="text-left pb-4 font-medium">Name</th>
                <th className="text-left pb-4 font-medium">Email</th>
                <th className="text-left pb-4 font-medium">Subject</th>
                <th className="text-left pb-4 font-medium">Message</th>
                <th className="text-left pb-4 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-white/20 text-sm">No messages yet</td>
                </tr>
              ) : (
                messages.map((m) => (
                  <tr key={m.id} className="border-t border-white/4 hover:bg-white/2 transition-colors">
                    <td className="py-3.5 pr-6 text-white/80 text-sm font-medium whitespace-nowrap">{m.name}</td>
                    <td className="py-3.5 pr-6 text-white/55 text-sm">{m.email}</td>
                    <td className="py-3.5 pr-6 text-white/45 text-sm max-w-[160px]">
                      <span className="block truncate">{m.subject}</span>
                    </td>
                    <td className="py-3.5 pr-6 text-white/35 text-sm max-w-xs">
                      <span className="block truncate">{m.message}</span>
                    </td>
                    <td className="py-3.5 text-white/25 text-xs whitespace-nowrap">{formatDate(m.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}

        {tab === 'subscribers' && (
          <table className="w-full min-w-[400px]">
            <thead>
              <tr className="text-white/25 text-[10px] tracking-[0.2em] uppercase">
                <th className="text-left pb-4 font-medium">Email</th>
                <th className="text-left pb-4 font-medium">Locale</th>
                <th className="text-left pb-4 font-medium">Subscribed</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-white/20 text-sm">No subscribers yet</td>
                </tr>
              ) : (
                subscribers.map((s) => (
                  <tr key={s.id} className="border-t border-white/4 hover:bg-white/2 transition-colors">
                    <td className="py-3.5 pr-6 text-white/70 text-sm">{s.email}</td>
                    <td className="py-3.5 pr-6">
                      <span className="text-[10px] tracking-[0.2em] uppercase text-gold/70 border border-gold/20 rounded-full px-2 py-0.5">{s.locale}</span>
                    </td>
                    <td className="py-3.5 text-white/25 text-xs">{formatDate(s.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
