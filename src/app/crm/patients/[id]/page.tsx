import { requireCRMAuth } from '@/lib/crm-auth'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import CRMPatientDetailClient from './CRMPatientDetailClient'

export const dynamic = 'force-dynamic'

export default async function CRMPatientDetailPage({ params }: { params: { id: string } }) {
  await requireCRMAuth()

  const patient = await prisma.patient.findUnique({
    where: { id: params.id },
    include: {
      user: { select: { id: true, email: true, emailVerified: true, role: true, createdAt: true } },
      treatments: {
        include: { steps: { orderBy: { order: 'asc' } } },
        orderBy: { createdAt: 'desc' },
      },
      appointments: { orderBy: { scheduledAt: 'asc' } },
      documents: { orderBy: { createdAt: 'desc' } },
      payments: { orderBy: { createdAt: 'desc' } },
    },
  })

  if (!patient) notFound()

  // Serialise Dates for client component
  return <CRMPatientDetailClient patient={JSON.parse(JSON.stringify(patient))} />
}
