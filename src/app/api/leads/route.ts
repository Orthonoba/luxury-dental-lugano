import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

function isAuthorized(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value
  return !!process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
}

export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '50', 10)))
  const skip = (page - 1) * limit

  try {
    const [leads, messages, subscribers, leadsTotal, messagesTotal, subscribersTotal] =
      await Promise.all([
        prisma.patientLead.findMany({
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.contactMessage.findMany({
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.newsletter.findMany({
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit,
        }),
        prisma.patientLead.count(),
        prisma.contactMessage.count(),
        prisma.newsletter.count(),
      ])

    return NextResponse.json({
      leads,
      messages,
      subscribers,
      pagination: {
        page,
        limit,
        leadsTotal,
        messagesTotal,
        subscribersTotal,
        leadsTotalPages: Math.ceil(leadsTotal / limit),
        messagesTotalPages: Math.ceil(messagesTotal / limit),
        subscribersTotalPages: Math.ceil(subscribersTotal / limit),
      },
    })
  } catch (error) {
    console.error('[leads/route] Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
