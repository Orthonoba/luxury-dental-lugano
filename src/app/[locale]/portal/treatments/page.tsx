import { redirect } from 'next/navigation'
import { Link } from '@/navigation'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { getTranslations } from 'next-intl/server'

export const dynamic = 'force-dynamic'

type TreatmentStatus = 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED'
type StepStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'SKIPPED'

function statusBadge(status: TreatmentStatus) {
  const map: Record<TreatmentStatus, string> = {
    IN_PROGRESS: 'text-olive-light bg-olive/10 border-olive/20',
    PLANNED: 'text-gold bg-gold/10 border-gold/20',
    COMPLETED: 'text-white/50 bg-white/5 border-white/10',
    CANCELLED: 'text-red-400 bg-red-500/10 border-red-500/20',
  }
  return map[status]
}

export default async function TreatmentsPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const t = await getTranslations('portal.treatments')
  const session = await getSession()
  if (!session) redirect(`/${locale}/portal/login`)

  const patient = await prisma.patient.findUnique({ where: { userId: session.userId } })
  if (!patient) redirect(`/${locale}/portal/login`)

  const treatments = await prisma.treatment.findMany({
    where: { patientId: patient.id },
    include: { steps: { orderBy: { order: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div>
        <p className="text-white/40 text-[11px] tracking-[0.2em] uppercase">{t('section')}</p>
        <h1 className="font-display text-white text-2xl font-semibold mt-1">{t('title')}</h1>
      </div>

      {treatments.length === 0 ? (
        <div className="bg-white/4 border border-white/8 rounded-2xl p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white/20">
              <path d="M10 3C7 3 4.5 5.5 4.5 8.5c0 1.8.8 3.5 2 4.6L7 17h6l.5-3.9c1.2-1.1 2-2.8 2-4.6C15.5 5.5 13 3 10 3z" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
          </div>
          <p className="text-white/30 text-sm">{t('empty')}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {treatments.map((treatment) => (
            <Link
              key={treatment.id}
              href={`/portal/treatments/${treatment.id}` as '/portal'}
              className="block bg-white/4 border border-white/8 rounded-2xl p-6 hover:bg-white/6 hover:border-white/12 transition-colors group"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-white font-semibold text-base group-hover:text-white/90">{treatment.title}</h3>
                  {treatment.doctorName && (
                    <p className="text-white/35 text-sm mt-0.5">{treatment.doctorName}</p>
                  )}
                </div>
                <span className={`shrink-0 text-[10px] tracking-[0.12em] uppercase px-2.5 py-1 rounded-full border ${statusBadge(treatment.status as TreatmentStatus)}`}>
                  {t(`status_${treatment.status}` as 'status_PLANNED')}
                </span>
              </div>

              {/* Progress */}
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-xs">
                  <span className="text-white/30">{t('progress')}</span>
                  <span className="text-white/50">{treatment.progress}%</span>
                </div>
                <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-olive to-olive-light rounded-full"
                    style={{ width: `${treatment.progress}%` }}
                  />
                </div>
              </div>

              {/* Timeline preview */}
              {treatment.steps.length > 0 && (
                <div className="flex items-center gap-1.5 flex-wrap">
                  {treatment.steps.map((step) => (
                    <div
                      key={step.id}
                      title={step.title}
                      className={`w-2 h-2 rounded-full ${
                        step.status === 'COMPLETED' ? 'bg-olive' :
                        step.status === 'IN_PROGRESS' ? 'bg-gold' :
                        'bg-white/15'
                      }`}
                    />
                  ))}
                  <span className="text-white/25 text-xs ml-1">
                    {treatment.steps.filter((s) => s.status === 'COMPLETED').length}/{treatment.steps.length} {t('steps')}
                  </span>
                </div>
              )}

              {/* Meta */}
              <div className="flex gap-4 mt-3 pt-3 border-t border-white/5">
                {treatment.startDate && (
                  <span className="text-white/25 text-xs">
                    {t('start')}: {new Date(treatment.startDate).toLocaleDateString(locale === 'it' ? 'it-IT' : locale)}
                  </span>
                )}
                {treatment.totalCost && (
                  <span className="text-white/25 text-xs">
                    {treatment.currency} {Number(treatment.totalCost).toLocaleString('it-IT')}
                  </span>
                )}
                <span className="ml-auto text-white/20 text-xs group-hover:text-white/40 transition-colors">
                  {t('viewDetail')} →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
