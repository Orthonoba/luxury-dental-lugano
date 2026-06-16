'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

type PaymentStatus = 'PENDING' | 'PAID' | 'PARTIAL' | 'OVERDUE' | 'CANCELLED'

interface Payment {
  id: string
  amount: string
  currency: string
  status: PaymentStatus
  method: string | null
  description: string | null
  paidAt: string | null
  createdAt: string
  treatment: { id: string; title: string } | null
}

function statusBadge(status: PaymentStatus) {
  const map: Record<PaymentStatus, string> = {
    PAID: 'text-olive-light bg-olive/10 border-olive/20',
    PENDING: 'text-gold bg-gold/10 border-gold/20',
    PARTIAL: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    OVERDUE: 'text-red-400 bg-red-500/10 border-red-500/20',
    CANCELLED: 'text-white/30 bg-white/4 border-white/8',
  }
  return map[status]
}

function statusIcon(status: PaymentStatus) {
  if (status === 'PAID') return '✓'
  if (status === 'OVERDUE') return '!'
  if (status === 'PARTIAL') return '½'
  return '·'
}

export default function PaymentsPage() {
  const t = useTranslations('portal.payments')
  const params = useParams()
  const locale = (params?.locale as string) ?? 'it'

  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/portal/payments')
      .then((r) => r.json())
      .then(setPayments)
      .finally(() => setLoading(false))
  }, [])

  const total = payments.reduce((s, p) => s + Number(p.amount), 0)
  const paid = payments.filter((p) => p.status === 'PAID').reduce((s, p) => s + Number(p.amount), 0)
  const pending = payments.filter((p) => ['PENDING', 'PARTIAL', 'OVERDUE'].includes(p.status)).reduce((s, p) => s + Number(p.amount), 0)

  const currency = payments[0]?.currency ?? 'CHF'

  const fmt = (n: number) => n.toLocaleString('it-IT', { minimumFractionDigits: 2 })

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-16 bg-white/4 border border-white/8 rounded-xl animate-pulse" />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-white/40 text-[11px] tracking-[0.2em] uppercase">{t('section')}</p>
        <h1 className="font-display text-white text-2xl font-semibold mt-1">{t('title')}</h1>
      </div>

      {payments.length === 0 ? (
        <div className="bg-white/4 border border-white/8 rounded-2xl p-12 text-center">
          <p className="text-white/30 text-sm">{t('empty')}</p>
        </div>
      ) : (
        <>
          {/* Summary cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/4 border border-white/8 rounded-2xl p-4">
              <p className="text-white/30 text-[10px] uppercase tracking-wider mb-1">{t('total')}</p>
              <p className="text-white font-display text-lg font-semibold">{currency} {fmt(total)}</p>
            </div>
            <div className="bg-olive/8 border border-olive/15 rounded-2xl p-4">
              <p className="text-olive-light/60 text-[10px] uppercase tracking-wider mb-1">{t('paid')}</p>
              <p className="text-olive-light font-display text-lg font-semibold">{currency} {fmt(paid)}</p>
            </div>
            <div className={`rounded-2xl p-4 ${pending > 0 ? 'bg-amber-500/8 border border-amber-500/20' : 'bg-white/4 border border-white/8'}`}>
              <p className={`text-[10px] uppercase tracking-wider mb-1 ${pending > 0 ? 'text-amber-400/60' : 'text-white/30'}`}>{t('pending')}</p>
              <p className={`font-display text-lg font-semibold ${pending > 0 ? 'text-amber-400' : 'text-white/30'}`}>{currency} {fmt(pending)}</p>
            </div>
          </div>

          {/* Payment list */}
          <div className="space-y-2">
            {payments.map((payment) => (
              <div key={payment.id} className="bg-white/4 border border-white/8 rounded-xl p-4 flex items-center gap-4">
                <div className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 text-xs font-semibold ${statusBadge(payment.status)}`}>
                  {statusIcon(payment.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/70 text-sm font-medium truncate">
                    {payment.description ?? (payment.treatment?.title ?? t('payment'))}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    {payment.treatment && (
                      <span className="text-white/25 text-xs truncate">{payment.treatment.title}</span>
                    )}
                    <span className="text-white/20 text-xs">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleDateString(locale === 'it' ? 'it-IT' : locale)
                        : new Date(payment.createdAt).toLocaleDateString(locale === 'it' ? 'it-IT' : locale)}
                    </span>
                    {payment.method && (
                      <span className="text-white/20 text-xs">· {payment.method}</span>
                    )}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-white/80 text-sm font-semibold">
                    {payment.currency} {fmt(Number(payment.amount))}
                  </p>
                  <span className={`text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full border ${statusBadge(payment.status)}`}>
                    {t(`status_${payment.status}` as 'status_PAID')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
