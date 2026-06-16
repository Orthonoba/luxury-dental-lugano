import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const token = new URL(request.url).searchParams.get('token')
  if (!token) return NextResponse.json({ error: 'Token required' }, { status: 400 })

  const resetToken = await prisma.passwordResetToken.findUnique({ where: { token } })
  if (!resetToken || resetToken.usedAt || resetToken.expiresAt < new Date()) {
    return NextResponse.json({ error: 'Invalid or expired verification link.' }, { status: 400 })
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: resetToken.userId }, data: { emailVerified: true } }),
    prisma.passwordResetToken.update({ where: { id: resetToken.id }, data: { usedAt: new Date() } }),
  ])

  // Redirect to login with success flag
  const locale = 'it' // default locale
  return NextResponse.redirect(
    new URL(`/${locale}/portal/login?verified=1`, request.url)
  )
}
