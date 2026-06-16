import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'
import { generateResetToken } from '@/lib/auth'
import { createRateLimiter } from '@/lib/rateLimit'

const limiter = createRateLimiter(3, 15 * 60_000)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null
const FROM_EMAIL = 'Luxury Dental <noreply@luxurydental.ch>'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? 'https://www.luxurydental.ch'

const schema = z.object({
  email: z.string().email(),
  locale: z.enum(['it', 'en', 'es', 'de', 'fr']).default('it'),
})

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (limiter(ip)) {
    return NextResponse.json({ error: 'Too many attempts.' }, { status: 429 })
  }

  const body = await request.json().catch(() => null)
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid input.' }, { status: 400 })
  }

  const { email, locale } = parsed.data

  // Always respond ok to not reveal whether email exists
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
  if (!user) {
    return NextResponse.json({ ok: true })
  }

  // Invalidate existing tokens
  await prisma.passwordResetToken.deleteMany({ where: { userId: user.id } })

  const token = generateResetToken()
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

  await prisma.passwordResetToken.create({
    data: { userId: user.id, token, expiresAt },
  })

  const resetUrl = `${BASE_URL}/${locale}/portal/reset-password?token=${token}`

  if (resend) {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Luxury Dental — Reset password / Recupero password',
      html: `
        <div style="font-family: Georgia, serif; max-width: 520px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #0a0d06; padding: 24px 32px; border-radius: 8px 8px 0 0;">
            <p style="margin: 0; color: #C8A96B; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">Luxury Dental &amp; Facial Estética</p>
            <h1 style="margin: 8px 0 0; color: #fff; font-size: 20px; font-weight: 600;">Reset Password</h1>
          </div>
          <div style="border: 1px solid #e8e0d5; border-top: none; padding: 28px 32px; border-radius: 0 0 8px 8px; background: #fdfaf7;">
            <p style="font-size: 15px; line-height: 1.7; margin: 0 0 20px;">
              Abbiamo ricevuto una richiesta di reset della password per il suo account.<br/>
              <em style="color:#888; font-size:13px;">We received a password reset request for your account.</em>
            </p>
            <a href="${resetUrl}" style="display: inline-block; background: #607C3A; color: #fff; padding: 12px 28px; border-radius: 100px; font-size: 13px; text-decoration: none; letter-spacing: 0.05em; margin-bottom: 20px;">
              Reimposta la password →
            </a>
            <p style="font-size: 12px; color: #aaa; margin: 16px 0 0;">
              Il link scade tra 1 ora. Se non hai richiesto il reset, ignora questa email.<br/>
              <em>Link expires in 1 hour. If you didn't request this, ignore this email.</em>
            </p>
          </div>
        </div>
      `,
    })
  }

  return NextResponse.json({ ok: true })
}
