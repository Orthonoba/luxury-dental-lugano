import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await getSession()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { patient: true },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({
    id: user.id,
    email: user.email,
    role: user.role,
    patient: user.patient
      ? {
          id: user.patient.id,
          firstName: user.patient.firstName,
          lastName: user.patient.lastName,
          phone: user.patient.phone,
          preferredLocale: user.patient.preferredLocale,
        }
      : null,
  })
}
