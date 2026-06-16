import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const patient = await prisma.patient.findUnique({
    where: { userId: session.userId },
    include: {
      user: { select: { email: true, role: true, emailVerified: true, createdAt: true } },
      treatments: { include: { steps: { orderBy: { order: 'asc' } } } },
      appointments: { orderBy: { scheduledAt: 'asc' } },
      documents: {
        select: {
          id: true, name: true, type: true, description: true,
          fileSize: true, mimeType: true, createdAt: true, uploadedBy: true,
          // filePath excluded: internal server path, not patient-relevant
        },
      },
      payments: { orderBy: { createdAt: 'asc' } },
    },
  })

  if (!patient) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const exportData = {
    exportedAt: new Date().toISOString(),
    exportedBy: session.email,
    legalBasis: 'GDPR Art. 20 — Right to data portability',
    patient: {
      id: patient.id,
      firstName: patient.firstName,
      lastName: patient.lastName,
      phone: patient.phone,
      dateOfBirth: patient.dateOfBirth,
      preferredLocale: patient.preferredLocale,
      notes: patient.notes,
      createdAt: patient.createdAt,
      account: patient.user,
    },
    treatments: patient.treatments,
    appointments: patient.appointments,
    documents: patient.documents,
    payments: patient.payments.map(p => ({
      ...p,
      // Exclude internal IDs from export
    })),
  }

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="luxury-dental-my-data-${new Date().toISOString().slice(0, 10)}.json"`,
      'Cache-Control': 'private, no-cache, no-store',
    },
  })
}
