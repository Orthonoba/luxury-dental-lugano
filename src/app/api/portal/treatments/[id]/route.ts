import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const patient = await prisma.patient.findUnique({ where: { userId: session.userId } })
  if (!patient) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const treatment = await prisma.treatment.findFirst({
    where: { id: params.id, patientId: patient.id }, // ownership check
    include: {
      steps: { orderBy: { order: 'asc' } },
      payments: { orderBy: { createdAt: 'desc' } },
    },
  })

  if (!treatment) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(treatment)
}
