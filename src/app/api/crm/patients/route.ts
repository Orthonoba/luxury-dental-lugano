import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

function isAuthorized(req: NextRequest): boolean {
  const cookieStore = req.cookies
  const token = cookieStore.get('admin_token')?.value
  return !!token && !!process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
}

const createSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  phone: z.string().max(30).optional(),
  preferredLocale: z.enum(['it', 'en', 'es', 'de', 'fr']).default('it'),
})

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const patients = await prisma.patient.findMany({
    include: {
      user: { select: { email: true, emailVerified: true, createdAt: true } },
      _count: { select: { treatments: true, appointments: true, documents: true, payments: true } },
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(patients)
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => null)
  const parsed = createSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 })
  }

  const { email, password, firstName, lastName, phone, preferredLocale } = parsed.data

  const existing = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
  if (existing) {
    return NextResponse.json({ error: 'Email già registrata.' }, { status: 409 })
  }

  const passwordHash = await hashPassword(password)

  const user = await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      passwordHash,
      role: 'PATIENT',
      emailVerified: true,
      patient: {
        create: { firstName, lastName, phone, preferredLocale },
      },
    },
    include: { patient: true },
  })

  return NextResponse.json({ id: user.id, email: user.email, patient: user.patient }, { status: 201 })
}
