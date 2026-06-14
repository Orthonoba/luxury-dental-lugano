import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const perPage = Math.min(Number(searchParams.get('per_page') ?? 10), 100)
  return NextResponse.json({ data: [], total: 0, per_page: perPage }, { status: 200 })
}
