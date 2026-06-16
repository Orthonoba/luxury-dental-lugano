import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

function isAuthorized(req: NextRequest): boolean {
  const token = req.cookies.get('admin_token')?.value
  return !!token && !!process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
}

const paymentSchema = z.object({
  treatmentId: z.string().optional(),
  amount: z.number().positive(),
  currency: z.string().default('CHF'),
  status: z.enum(['PENDING', 'PAID', 'PARTIAL', 'OVERDUE', 'CANCELLED']).default('PENDING'),
  method: z.string().max(50).optional(),
  description: z.string().max(300).optional(),
  paidAt: z.string().optional(),
})

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const patient = await prisma.patient.findUnique({ where: { id: params.id } })
  if (!patient) return NextResponse.json({ error: 'Patient not found' }, { status: 404 })

  const body = await request.json().catch(() => null)
  const parsed = paymentSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 })
  }

  const { paidAt, ...rest } = parsed.data
  const payment = await prisma.payment.create({
    data: {
      ...rest,
      patientId: patient.id,
      paidAt: paidAt ? new Date(paidAt) : null,
    },
  })

  return NextResponse.json(payment, { status: 201 })
}
