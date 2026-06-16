import { requireCRMAuth } from '@/lib/crm-auth'
import { prisma } from '@/lib/prisma'
import CRMPatientsClient from './CRMPatientsClient'

export const dynamic = 'force-dynamic'

export default async function CRMPatientsPage() {
  await requireCRMAuth()

  const patients = await prisma.patient.findMany({
    include: {
      user: { select: { email: true, emailVerified: true, createdAt: true } },
      _count: { select: { treatments: true, appointments: true, documents: true, payments: true } },
      treatments: {
        orderBy: { createdAt: 'desc' },
        take: 1,
        select: { status: true, title: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return <CRMPatientsClient patients={patients} />
}
