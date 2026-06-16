import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { createRateLimiter } from '@/lib/rateLimit'

const limiter = createRateLimiter(10, 60_000)

const requestSchema = z.object({
  title: z.string().min(1).max(200),
  type: z.enum(['dental', 'facial']).default('dental'),
  desiredDate: z.string().min(1),
  desiredTime: z.string().min(1),
  notes: z.string().max(500).optional(),
})

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const patient = await prisma.patient.findUnique({ where: { userId: session.userId } })
  if (!patient) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const appointments = await prisma.patientAppointment.findMany({
    where: { patientId: patient.id },
    orderBy: { scheduledAt: 'desc' },
  })

  return NextResponse.json(appointments)
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (limiter(ip)) return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })

  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const patient = await prisma.patient.findUnique({ where: { userId: session.userId } })
  if (!patient) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body = await request.json().catch(() => null)
  const parsed = requestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 })
  }

  const { title, type, desiredDate, desiredTime, notes } = parsed.data
  const scheduledAt = new Date(`${desiredDate}T${desiredTime}:00`)

  const appointment = await prisma.patientAppointment.create({
    data: {
      patientId: patient.id,
      title,
      type,
      scheduledAt,
      notes,
      status: 'SCHEDULED',
    },
  })

  return NextResponse.json(appointment, { status: 201 })
}
