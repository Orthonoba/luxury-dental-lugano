import { notFound, redirect } from 'next/navigation'
import { Link } from '@/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'

type StepStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED'

function stepStyle(status: StepStatus) {
  if (status === 'COMPLETED') return { dot: 'bg-olive border-olive', line: 'bg-olive', text: 'text-white/60 line-through' }
  if (status === 'IN_PROGRESS') return { dot: 'bg-gold/20 border-gold', line: 'bg-white/10', text: 'text-white' }
  return { dot: 'bg-transparent border-white/20', line: 'bg-white/8', text: 'text-white/40' }
}

export default async function TreatmentDetailPage({
  params: { locale, id },
}: {
  params: { locale: string; id: string }
}) {
  const t = await getTranslations('portal.treatments')
  const session = await getSession()
  if (!session) redirect(`/${locale}/portal/login`)

  const patient = await prisma.patient.findUnique({ where: { userId: session.userId } })
  if (!patient) redirect(`/${locale}/portal/login`)

  const treatment = await prisma.treatment.findFirst({
    where: { id, patientId: patient.id },
    include: {
      steps: { orderBy: { order: 'asc' } },
      payments: { orderBy: { createdAt: 'desc' } },
    },
  })

  if (!treatment) notFound()

  return (
    <div className="space-y-6">
      {/* Back */}
      <Link
        href="/portal/treatments"
        className="inline-flex items-center gap-2 text-white/35 hover:text-white/60 text-sm transition-colors"
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        {t('backToList')}
      </Link>

      {/* Header */}
      <div className="bg-white/4 border border-white/8 rounded-2xl p-6">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-white text-xl font-semibold">{treatment.title}</h1>
            {treatment.doctorName && <p className="text-white/40 text-sm mt-1">{t('doctor')}: {treatment.doctorName}</p>}
          </div>
          <span className={`shrink-0 text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border ${
            treatment.status === 'IN_PROGRESS' ? 'text-olive-light bg-olive/10 border-olive/20' :
            treatment.status === 'COMPLETED' ? 'text-white/50 bg-white/5 border-white/10' :
            treatment.status === 'PLANNED' ? 'text-gold bg-gold/10 border-gold/20' :
            'text-red-400 bg-red-500/10 border-red-500/20'
          }`}>
            {t(`status_${treatment.status}` as 'status_PLANNED')}
          </span>
        </div>

        {treatment.description && (
          <p className="text-white/50 text-sm leading-relaxed mb-6">{treatment.description}</p>
        )}

        {/* Progress */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm">
            <span className="text-white/40">{t('progress')}</span>
            <span className="text-white font-medium">{treatment.progress}%</span>
          </div>
          <div className="h-3 bg-white/8 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-olive to-olive-light rounded-full transition-all"
              style={{ width: `${treatment.progress}%` }}
            />
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {treatment.startDate && (
            <div>
              <p className="text-white/25 text-[10px] uppercase tracking-wider mb-1">{t('startDate')}</p>
              <p className="text-white/60 text-sm">{new Date(treatment.startDate).toLocaleDateString(locale === 'it' ? 'it-IT' : locale, { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            </div>
          )}
          {treatment.estimatedEnd && (
            <div>
              <p className="text-white/25 text-[10px] uppercase tracking-wider mb-1">{t('estimatedEnd')}</p>
              <p className="text-white/60 text-sm">{new Date(treatment.estimatedEnd).toLocaleDateString(locale === 'it' ? 'it-IT' : locale, { day: '2-digit', month: 'long', year: 'numeric' })}</p>
            </div>
          )}
          {treatment.totalCost && (
            <div>
              <p className="text-white/25 text-[10px] uppercase tracking-wider mb-1">{t('totalCost')}</p>
              <p className="text-white/60 text-sm">{treatment.currency} {Number(treatment.totalCost).toLocaleString('it-IT', { minimumFractionDigits: 2 })}</p>
            </div>
          )}
        </div>
      </div>

      {/* Timeline */}
      {treatment.steps.length > 0 && (
        <div className="bg-white/4 border border-white/8 rounded-2xl p-6">
          <h2 className="text-white/40 text-[11px] tracking-[0.18em] uppercase mb-5">{t('timeline')}</h2>
          <div className="relative">
            {treatment.steps.map((step, idx) => {
              const styles = stepStyle(step.status as StepStatus)
              const isLast = idx === treatment.steps.length - 1
              return (
                <div key={step.id} className="relative flex gap-4 pb-6 last:pb-0">
                  {/* Connector line */}
                  {!isLast && (
                    <div className={`absolute left-3.5 top-7 w-px h-full -translate-x-1/2 ${styles.line}`} />
                  )}
                  {/* Dot */}
                  <div className={`relative z-10 w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 ${styles.dot}`}>
                    {step.status === 'COMPLETED' && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                    {step.status === 'IN_PROGRESS' && (
                      <div className="w-2 h-2 rounded-full bg-gold" />
                    )}
                    {step.status === 'PENDING' && (
                      <span className="text-white/20 text-[9px] font-semibold">{idx + 1}</span>
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-1 pt-0.5">
                    <p className={`text-sm font-medium ${styles.text}`}>{step.title}</p>
                    {step.description && (
                      <p className="text-white/30 text-xs mt-0.5 leading-relaxed">{step.description}</p>
                    )}
                    {step.scheduledAt && (
                      <p className="text-white/20 text-xs mt-1">
                        {new Date(step.scheduledAt).toLocaleDateString(locale === 'it' ? 'it-IT' : locale, { day: '2-digit', month: 'short', year: 'numeric' })}
                      </p>
                    )}
                    {step.completedAt && (
                      <p className="text-olive/50 text-xs mt-0.5">
                        ✓ {new Date(step.completedAt).toLocaleDateString(locale === 'it' ? 'it-IT' : locale, { day: '2-digit', month: 'short' })}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Payments related to this treatment */}
      {treatment.payments.length > 0 && (
        <div className="bg-white/4 border border-white/8 rounded-2xl p-6">
          <h2 className="text-white/40 text-[11px] tracking-[0.18em] uppercase mb-4">{t('relatedPayments')}</h2>
          <div className="space-y-3">
            {treatment.payments.map((payment) => (
              <div key={payment.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-white/70 text-sm">{payment.description ?? t('payment')}</p>
                  {payment.paidAt && (
                    <p className="text-white/25 text-xs">{new Date(payment.paidAt).toLocaleDateString(locale === 'it' ? 'it-IT' : locale)}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-white/80 text-sm font-medium">{payment.currency} {Number(payment.amount).toLocaleString('it-IT', { minimumFractionDigits: 2 })}</p>
                  <span className={`text-[10px] ${payment.status === 'PAID' ? 'text-olive-light' : payment.status === 'PENDING' ? 'text-gold' : 'text-red-400'}`}>
                    {t(`paymentStatus_${payment.status}` as 'paymentStatus_PAID')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
