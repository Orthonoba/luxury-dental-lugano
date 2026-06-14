import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const NewsletterSchema = z.object({
  email: z.string().email(),
  locale: z.enum(['en', 'es', 'it', 'de', 'fr']).default('en'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parsed = NewsletterSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    await prisma.newsletter.create({
      data: { email: parsed.data.email, locale: parsed.data.locale },
    })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      'code' in error &&
      (error as { code: string }).code === 'P2002'
    ) {
      return NextResponse.json({ success: true }, { status: 200 })
    }
    console.error('[newsletter/route] Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
