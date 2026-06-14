import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createRateLimiter } from '@/lib/rateLimit'
import { dentalBookingSchema } from '@/lib/validations/booking'
import { sendBookingNotification, sendBookingConfirmation } from '@/lib/email'

const isRateLimited = createRateLimiter(5, 60_000)

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Demasiadas solicitudes. Inténtalo de nuevo en un momento.' },
      { status: 429 },
    )
  }

  try {
    const body = await request.json()
    const parsed = dentalBookingSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Datos del formulario no válidos', issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      )
    }

    const {
      firstName, lastName, email, phone, dateOfBirth,
      service, notes, desiredDate, desiredTime, gdprConsent,
    } = parsed.data

    const [y, m, d] = desiredDate.split('-').map(Number)
    const desiredDateUTC = new Date(Date.UTC(y, m - 1, d, 12, 0, 0))

    const conflict = await prisma.bookingRequest.findFirst({
      where: {
        type: 'dental',
        desiredDate: desiredDateUTC,
        desiredTime,
        status: { not: 'cancelled' },
      },
    })

    if (conflict) {
      return NextResponse.json(
        { error: 'Este horario ya no está disponible. Por favor selecciona otro.' },
        { status: 409 },
      )
    }

    const booking = await prisma.bookingRequest.create({
      data: {
        type: 'dental',
        firstName,
        lastName,
        email,
        phone,
        dateOfBirth: dateOfBirth ?? null,
        service,
        notes: notes ?? null,
        desiredDate: desiredDateUTC,
        desiredTime,
        gdprConsent,
        status: 'pending',
      },
    })

    sendBookingNotification({
      type: 'dental',
      firstName, lastName, email, phone,
      service, desiredDate, desiredTime,
      bookingId: booking.id,
    }).catch((err) => console.error('[dental] Admin email failed:', err))

    sendBookingConfirmation({
      type: 'dental',
      firstName, email, service, desiredDate, desiredTime,
    }).catch((err) => console.error('[dental] Patient email failed:', err))

    return NextResponse.json({ success: true, bookingId: booking.id }, { status: 201 })
  } catch (error) {
    console.error('[dental/booking] Error:', error)
    return NextResponse.json(
      { error: 'Error del servidor. Por favor inténtalo de nuevo.' },
      { status: 500 },
    )
  }
}
