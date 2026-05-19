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

  try {
    const [leads, messages, subscribers] = await Promise.all([
      prisma.patientLead.findMany({ orderBy: { createdAt: 'desc' }, take: 200 }),
      prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 200 }),
      prisma.newsletter.findMany({ orderBy: { createdAt: 'desc' }, take: 200 }),
    ])

    return NextResponse.json({ leads, messages, subscribers })
  } catch (error) {
    console.error('[leads/route] Error:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
