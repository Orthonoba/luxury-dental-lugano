import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const patient = await prisma.patient.findUnique({ where: { userId: session.userId } })
  if (!patient) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const documents = await prisma.document.findMany({
    where: { patientId: patient.id },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      type: true,
      name: true,
      description: true,
      fileSize: true,
      mimeType: true,
      createdAt: true,
      // filePath is intentionally omitted from the list endpoint
    },
  })

  return NextResponse.json(documents)
}
