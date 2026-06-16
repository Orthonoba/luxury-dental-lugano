import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'

function isAuthorized(req: NextRequest): boolean {
  const token = req.cookies.get('admin_token')?.value
  return !!token && !!process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
}

const updateSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(1000).optional().nullable(),
  status: z.enum(['PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).optional(),
  progress: z.number().int().min(0).max(100).optional(),
  doctorName: z.string().max(100).optional().nullable(),
  startDate: z.string().optional().nullable(),
  estimatedEnd: z.string().optional().nullable(),
  totalCost: z.number().positive().optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
})

const stepUpdateSchema = z.object({
  id: z.string(),
  status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED', 'SKIPPED']).optional(),
  completedAt: z.string().optional().nullable(),
  scheduledAt: z.string().optional().nullable(),
  title: z.string().optional(),
  description: z.string().optional().nullable(),
})

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => null)

  // Handle step update
  if (body?.stepId || Array.isArray(body?.steps)) {
    const steps: z.infer<typeof stepUpdateSchema>[] = Array.isArray(body.steps) ? body.steps : [body]
    const updates = await Promise.all(
      steps.map((step) => {
        const parsed = stepUpdateSchema.safeParse(step)
        if (!parsed.success) return null
        const { id, completedAt, scheduledAt, ...rest } = parsed.data
        return prisma.treatmentStep.update({
          where: { id },
          data: {
            ...rest,
            completedAt: completedAt ? new Date(completedAt) : completedAt === null ? null : undefined,
            scheduledAt: scheduledAt ? new Date(scheduledAt) : scheduledAt === null ? null : undefined,
          },
        })
      }),
    )
    return NextResponse.json(updates.filter(Boolean))
  }

  // Handle treatment update
  const parsed = updateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 })
  }

  const { startDate, estimatedEnd, totalCost, ...rest } = parsed.data

  const treatment = await prisma.treatment.update({
    where: { id: params.id },
    data: {
      ...rest,
      totalCost: totalCost ?? (totalCost === null ? null : undefined),
      startDate: startDate ? new Date(startDate) : startDate === null ? null : undefined,
      estimatedEnd: estimatedEnd ? new Date(estimatedEnd) : estimatedEnd === null ? null : undefined,
    },
    include: { steps: { orderBy: { order: 'asc' } } },
  })

  return NextResponse.json(treatment)
}
