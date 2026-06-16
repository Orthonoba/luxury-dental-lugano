import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

function isAuthorized(req: NextRequest): boolean {
  const token = req.cookies.get('admin_token')?.value
  return !!token && !!process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
}

const schema = z.object({
  title: z.string().min(1).max(255),
  type: z.string().default('dental'),
  status: z.enum(['SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'NO_SHOW']).default('SCHEDULED'),
  doctorName: z.string().max(150).optional(),
  scheduledAt: z.string().datetime(),
  duration: z.number().int().positive().default(30),
  notes: z.string().max(1000).optional(),
})

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const patient = await prisma.patient.findUnique({ where: { id: params.id } })
  if (!patient) return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
  const appointments = await prisma.patientAppointment.findMany({
    where: { patientId: params.id },
    orderBy: { scheduledAt: 'asc' },
  })
  return NextResponse.json(appointments)
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const patient = await prisma.patient.findUnique({ where: { id: params.id } })
  if (!patient) return NextResponse.json({ error: 'Patient not found' }, { status: 404 })
  const body = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 })
  const appt = await prisma.patientAppointment.create({
    data: { ...parsed.data, patientId: patient.id, scheduledAt: new Date(parsed.data.scheduledAt) },
  })
  return NextResponse.json(appt, { status: 201 })
}
