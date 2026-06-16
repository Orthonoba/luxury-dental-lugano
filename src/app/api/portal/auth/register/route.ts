import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { hashPassword, signToken, generateResetToken } from '@/lib/auth'
import { createRateLimiter } from '@/lib/rateLimit'

const rl = createRateLimiter(3, 10 * 60 * 1000) // 3 registrations per 10 min per IP

const schema = z.object({
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(72).regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain uppercase, lowercase and a number'
  ),
  phone: z.string().max(30).optional(),
  preferredLocale: z.enum(['it', 'en', 'es', 'de', 'fr']).default('it'),
  gdprConsent: z.literal(true, { errorMap: () => ({ message: 'GDPR consent is required' }) }),
})

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!rl(ip)) return NextResponse.json({ error: 'Too many registration attempts. Try again later.' }, { status: 429 })

  const body = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 })

  const { firstName, lastName, email, password, phone, preferredLocale } = parsed.data

  // Check for existing email
  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return NextResponse.json({ error: 'An account with this email already exists.' }, { status: 409 })

  const passwordHash = await hashPassword(password)
  const verificationToken = generateResetToken()

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      role: 'PATIENT',
      emailVerified: false,
      patient: {
        create: { firstName, lastName, phone, preferredLocale },
      },
      passwordResetTokens: {
        create: {
          token: verificationToken,
          expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h
        },
      },
    },
    include: { patient: true },
  })

  // Send verification email via Resend
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3005'
    const verifyUrl = `${baseUrl}/${preferredLocale}/portal/verify-email?token=${verificationToken}`
    const { Resend } = await import('resend')
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Luxury Dental <noreply@luxurydental.ch>',
      to: email,
      subject: 'Conferma il tuo account — Luxury Dental Paradiso',
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:40px 20px;">
          <h2 style="color:#2d4a2d;font-size:22px;margin-bottom:8px;">Benvenuto/a, ${firstName}!</h2>
          <p style="color:#555;font-size:15px;line-height:1.6;">
            Grazie per aver creato il tuo account sul portale paziente di Luxury Dental Paradiso.
            Clicca il bottone qui sotto per verificare il tuo indirizzo email.
          </p>
          <a href="${verifyUrl}"
             style="display:inline-block;margin:24px 0;padding:14px 32px;background:#4a6741;color:#fff;text-decoration:none;border-radius:50px;font-size:14px;font-weight:600;letter-spacing:0.05em;">
            Verifica Email
          </a>
          <p style="color:#999;font-size:12px;">
            Il link è valido per 24 ore. Se non hai creato questo account, ignora questa email.
          </p>
        </div>
      `,
    })
  } catch (err) {
    console.error('[register] Email send failed:', err)
    // Continue — user was created, they can request a new verification
  }

  return NextResponse.json(
    { message: 'Account created. Please check your email to verify your address before logging in.' },
    { status: 201 }
  )
}
