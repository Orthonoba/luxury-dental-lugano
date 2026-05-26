import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { availabilityQuerySchema } from '@/lib/validations/booking'
import { createRateLimiter } from '@/lib/rateLimit'

const isRateLimited = createRateLimiter(60, 60_000)

const WEEKDAY_SLOTS = Array.from({ length: 18 }, (_, i) => {
  const mins = 9 * 60 + i * 30
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`
})

const SATURDAY_SLOTS = Array.from({ length: 8 }, (_, i) => {
  const mins = 9 * 60 + i * 30
  return `${String(Math.floor(mins / 60)).padStart(2, '0')}:${String(mins % 60).padStart(2, '0')}`
})

export async function GET(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  const { searchParams } = new URL(request.url)
  const parsed = availabilityQuerySchema.safeParse({
    date: searchParams.get('date'),
    type: searchParams.get('type'),
  })

  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid parameters' }, { status: 400 })
  }

  const { date, type } = parsed.data
  const [year, month, day] = date.split('-').map(Number)

  const dayOfWeek = new Date(`${date}T12:00:00`).getDay()

  if (dayOfWeek === 0) {
    const allSlots = WEEKDAY_SLOTS
    return NextResponse.json({ date, type, allSlots, bookedSlots: allSlots })
  }

  const isSaturday = dayOfWeek === 6
  const allSlots = isSaturday ? SATURDAY_SLOTS : WEEKDAY_SLOTS

  const startOfDay = new Date(Date.UTC(year, month - 1, day, 0, 0, 0))
  const endOfDay   = new Date(Date.UTC(year, month - 1, day, 23, 59, 59))

  try {
    const bookings = await prisma.bookingRequest.findMany({
      where: {
        type,
        desiredDate: { gte: startOfDay, lte: endOfDay },
        status: { not: 'cancelled' },
      },
      select: { desiredTime: true },
    })

    const bookedSlots = bookings.map((b) => b.desiredTime)

    return NextResponse.json(
      { date, type, allSlots, bookedSlots },
      { headers: { 'Cache-Control': 'public, max-age=30, stale-while-revalidate=60' } },
    )
  } catch (error) {
    console.error('[availability] DB error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
