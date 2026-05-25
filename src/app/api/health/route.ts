import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export async function GET() {
  const checks: Record<string, 'ok' | 'error'> = {}
  let httpStatus = 200

  try {
    await prisma.$queryRaw`SELECT 1`
    checks.db = 'ok'
  } catch {
    checks.db = 'error'
    httpStatus = 503
  }

  return NextResponse.json(
    { status: httpStatus === 200 ? 'ok' : 'degraded', checks, ts: Date.now() },
    { status: httpStatus },
  )
}
