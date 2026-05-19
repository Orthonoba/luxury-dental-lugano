import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const ContactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  service: z.string().max(100).optional(),
  message: z.string().max(2000).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = ContactSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid form data' },
        { status: 400 }
      )
    }

    const { name, email, phone, service, message } = parsed.data

    const combinedMessage = [
      service ? `Service: ${service}` : null,
      message || null,
    ].filter(Boolean).join('\n\n') || null

    await prisma.patientLead.create({
      data: { name, email, phone: phone || null, message: combinedMessage },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error) {
    console.error('[contact/route] Error:', error)
    return NextResponse.json({ error: 'Server error. Please try again.' }, { status: 500 })
  }
}
