import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

function isAuthorized(req: NextRequest): boolean {
  const token = req.cookies.get('admin_token')?.value
  return !!token && !!process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
}

const stepSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  scheduledAt: z.string().optional(),
  order: z.number().int().min(0),
})

const treatmentSchema = z.object({
  title: z.string().min(1).max(200),
  type: z.enum(['IMPLANTOLOGY', 'ORTHODONTICS', 'AESTHETICS', 'WHITENING', 'PERIODONTICS', 'ENDODONTICS', 'FACIAL_AESTHETICS', 'OTHER']).default('OTHER'),
  description: z.string().max(1000).optional(),
  status: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).default('PLANNED'),
  startDate: z.string().optional(),
  estimatedEnd: z.string().optional(),
  doctorName: z.string().max(100).optional(),
  progress: z.number().int().min(0).max(100).default(0),
  totalCost: z.number().positive().optional(),
  currency: z.string().default('CHF'),
  notes: z.string().max(1000).optional(),
  steps: z.array(stepSchema).optional().default([]),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const treatments = await prisma.treatment.findMany({
    where: { patientId: params.id },
    include: { steps: { orderBy: { order: 'asc' } } },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(treatments)
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const patient = await prisma.patient.findUnique({ where: { id: params.id } })
  if (!patient) return NextResponse.json({ error: 'Patient not found' }, { status: 404 })

  const body = await request.json().catch(() => null)
  const parsed = treatmentSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 })
  }

  const { steps, startDate, estimatedEnd, totalCost, ...rest } = parsed.data

  const treatment = await prisma.treatment.create({
    data: {
      ...rest,
      patientId: patient.id,
      totalCost: totalCost ?? null,
      startDate: startDate ? new Date(startDate) : null,
      estimatedEnd: estimatedEnd ? new Date(estimatedEnd) : null,
      steps: {
        create: steps.map((s) => ({
          ...s,
          scheduledAt: s.scheduledAt ? new Date(s.scheduledAt) : null,
          status: 'PENDING',
        })),
      },
    },
    include: { steps: { orderBy: { order: 'asc' } } },
  })

  return NextResponse.json(treatment, { status: 201 })
}
