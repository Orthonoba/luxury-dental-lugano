import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createRateLimiter } from '@/lib/rateLimit'
import { sendLeadNotification } from '@/lib/email'
import { z } from 'zod'

const isRateLimited = createRateLimiter(10, 60_000) // 10 req/min per IP

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  service: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
})

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const parsed = ContactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid form data' }, { status: 400 })
    }

    const { name, email, phone, service, message } = parsed.data

    const combinedMessage = [
      service ? `Service: ${service}` : null,
      message || null,
    ].filter(Boolean).join('\n\n') || null

    const lead = await prisma.patientLead.create({
      data: { name, email, phone: phone || null, message: combinedMessage },
    })

    // Fire-and-forget email — failure never breaks the form submission
    sendLeadNotification({
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: lead.message,
    }).catch((err) => console.error('[contact] Email notification failed:', err))

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('[contact/route] Error:', error)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
