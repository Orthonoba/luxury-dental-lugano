import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { verifyPassword, signToken, buildSessionCookie } from '@/lib/auth'
import { createRateLimiter } from '@/lib/rateLimit'

const limiter = createRateLimiter(5, 10 * 60_000)

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
  rememberMe: z.boolean().optional().default(false),
})

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (limiter(ip)) {
    return NextResponse.json({ error: 'Too many attempts. Try again later.' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input.' }, { status: 400 })
  }

  const { email, password, rememberMe } = parsed.data

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    include: { patient: true },
  })

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return NextResponse.json({ error: 'Email o password non corretti.' }, { status: 401 })
  }

  const token = signToken(
    {
      userId: user.id,
      email: user.email,
      role: user.role,
      patientId: user.patient?.id,
    },
    rememberMe,
  )

  const cookie = buildSessionCookie(token, rememberMe)
  const response = NextResponse.json({
    ok: true,
    role: user.role,
    name: user.patient ? `${user.patient.firstName} ${user.patient.lastName}` : user.email,
  })
  response.cookies.set(cookie)
  return response
}
