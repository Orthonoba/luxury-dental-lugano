import { redirect } from 'next/navigation'
import { Link } from '@/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'

function statusColor(status: string) {
  const map: Record<string, string> = {
    IN_PROGRESS: 'text-olive-light bg-olive/10 border-olive/20',
    PLANNED: 'text-gold bg-gold/10 border-gold/20',
    COMPLETED: 'text-white/50 bg-white/5 border-white/10',
    CANCELLED: 'text-red-400 bg-red-500/10 border-red-500/20',
  }
  return map[status] ?? 'text-white/40 bg-white/5 border-white/10'
}

function appointmentStatusColor(status: string) {
  const map: Record<string, string> = {
    SCHEDULED: 'text-gold bg-gold/10 border-gold/20',
    CONFIRMED: 'text-olive-light bg-olive/10 border-olive/20',
    COMPLETED: 'text-white/50 bg-white/5 border-white/10',
    CANCELLED: 'text-red-400 bg-red-500/10 border-red-500/20',
  }
  return map[status] ?? 'text-white/40 bg-white/5 border-white/10'
}

function formatDate(d: Date | string, locale: string) {
  return new Date(d).toLocaleDateString(locale === 'it' ? 'it-IT' : locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function PortalDashboardPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations('portal.dashboard')
  const session = await getSession()
  if (!session) redirect(`/${locale}/portal/login`)

  const patient = await prisma.patient.findUnique({
    where: { userId: session.userId },
    include: {
      treatments: {
        where: { status: { in: ['PLANNED', 'IN_PROGRESS'] } },
        orderBy: { updatedAt: 'desc' },
        take: 3,
        include: { steps: { orderBy: { order: 'asc' } } },
      },
      appointments: {
        where: { scheduledAt: { gte: new Date() } },
        orderBy: { scheduledAt: 'asc' },
        take: 3,
      },
      payments: {
        where: { status: { in: ['PENDING', 'PARTIAL', 'OVERDUE'] } },
        orderBy: { createdAt: 'desc' },
        take: 3,
      },
      _count: {
        select: { documents: true, treatments: true, payments: true },
      },
    },
  })

  if (!patient) redirect(`/${locale}/portal/login`)

  const activeTreatment = patient.treatments[0] ?? null
  const nextAppointment = patient.appointments[0] ?? null
  const pendingPayments = patient.payments

  return (
    <div className="space-y-8">
      {/* Greeting */}
      <div>
        <p className="text-white/40 text-sm tracking-wider">{t('welcome')}</p>
        <h1 className="font-display text-white text-2xl sm:text-3xl font-semibold mt-1">
          {patient.firstName} {patient.lastName}
        </h1>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: t('statTreatments'), value: patient._count.treatments, href: '/portal/treatments' },
          { label: t('statAppointments'), value: patient.appointments.length, href: '/portal/appointments' },
          { label: t('statDocuments'), value: patient._count.documents, href: '/portal/documents' },
          { label: t('statPayments'), value: patient._count.payments, href: '/portal/payments' },
        ].map(({ label, value, href }) => (
          <Link
            key={href}
            href={href as '/portal'}
            className="bg-white/4 border border-white/8 rounded-2xl p-4 hover:bg-white/6 hover:border-white/12 transition-colors group"
          >
            <p className="text-white font-display font-semibold text-2xl">{value}</p>
            <p className="text-white/40 text-xs mt-1">{label}</p>
          </Link>
        ))}
      </div>

      {/* Active treatment */}
      {activeTreatment ? (
        <div className="bg-white/4 border border-white/8 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/40 text-[11px] tracking-[0.18em] uppercase">{t('activeTreatment')}</p>
            <Link
              href="/portal/treatments"
              className="text-gold/60 hover:text-gold text-xs transition-colors"
            >
              {t('viewAll')} →
            </Link>
          </div>
          <h3 className="text-white font-semibold text-lg mb-1">{activeTreatment.title}</h3>
          <div className="flex items-center gap-2 mb-4">
            <span className={`text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border ${statusColor(activeTreatment.status)}`}>
              {t(`status_${activeTreatment.status}` as 'status_PLANNED')}
            </span>
            {activeTreatment.doctorName && (
              <span className="text-white/30 text-xs">· {activeTreatment.doctorName}</span>
            )}
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-white/40">{t('progress')}</span>
              <span className="text-white/60 font-medium">{activeTreatment.progress}%</span>
            </div>
            <div className="h-2 bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-olive to-olive-light rounded-full transition-all duration-700"
                style={{ width: `${activeTreatment.progress}%` }}
              />
            </div>
          </div>

          {/* Steps preview */}
          {activeTreatment.steps.length > 0 && (
            <div className="mt-4 space-y-2">
              {activeTreatment.steps.slice(0, 4).map((step) => (
                <div key={step.id} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    step.status === 'COMPLETED'
                      ? 'bg-olive border-olive'
                      : step.status === 'IN_PROGRESS'
                      ? 'border-gold bg-gold/10'
                      : 'border-white/20 bg-transparent'
                  }`}>
                    {step.status === 'COMPLETED' && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none"><path d="M1.5 4l2 2 3-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    )}
                    {step.status === 'IN_PROGRESS' && (
                      <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                    )}
                  </div>
                  <span className={`text-sm ${step.status === 'COMPLETED' ? 'text-white/40 line-through' : step.status === 'IN_PROGRESS' ? 'text-white/80' : 'text-white/50'}`}>
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="bg-white/4 border border-white/8 rounded-2xl p-6 text-center">
          <p className="text-white/30 text-sm">{t('noActiveTreatment')}</p>
        </div>
      )}

      {/* Next appointment */}
      {nextAppointment && (
        <div className="bg-white/4 border border-white/8 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-white/40 text-[11px] tracking-[0.18em] uppercase">{t('nextAppointment')}</p>
            <Link href="/portal/appointments" className="text-gold/60 hover:text-gold text-xs transition-colors">
              {t('viewAll')} →
            </Link>
          </div>
          <div className="flex items-start gap-4">
            <div className="shrink-0 text-center bg-olive/10 border border-olive/20 rounded-xl px-4 py-3">
              <p className="text-olive-light text-xl font-display font-semibold">
                {new Date(nextAppointment.scheduledAt).getDate()}
              </p>
              <p className="text-white/30 text-[10px] uppercase tracking-wider">
                {new Date(nextAppointment.scheduledAt).toLocaleDateString(locale === 'it' ? 'it-IT' : locale, { month: 'short' })}
              </p>
            </div>
            <div>
              <h3 className="text-white font-medium">{nextAppointment.title}</h3>
              <p className="text-white/40 text-sm mt-0.5">
                {new Date(nextAppointment.scheduledAt).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}
                {nextAppointment.doctorName && ` · ${nextAppointment.doctorName}`}
              </p>
              <span className={`inline-block mt-2 text-[10px] tracking-[0.12em] uppercase px-2 py-0.5 rounded-full border ${appointmentStatusColor(nextAppointment.status)}`}>
                {t(`apptStatus_${nextAppointment.status}` as 'apptStatus_SCHEDULED')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Pending payments notice */}
      {pendingPayments.length > 0 && (
        <div className="bg-amber-500/8 border border-amber-500/20 rounded-2xl p-5 flex items-center gap-4">
          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-amber-400"><path d="M7 2v5M7 9.5v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/></svg>
          </div>
          <div className="flex-1">
            <p className="text-amber-300/90 text-sm font-medium">{t('pendingPayment', { count: pendingPayments.length })}</p>
            <Link href="/portal/payments" className="text-amber-400/60 hover:text-amber-400 text-xs transition-colors">
              {t('viewPayments')} →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
