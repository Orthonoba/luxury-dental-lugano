import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { readAndDecryptFile } from '@/lib/crypto'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const patient = await prisma.patient.findUnique({ where: { userId: session.userId } })
  if (!patient) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const document = await prisma.document.findFirst({
    where: { id: params.id, patientId: patient.id },
  })
  if (!document) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? undefined
  await prisma.documentAccessLog.create({
    data: { documentId: document.id, userId: session.userId, ipAddress: ip },
  })

  try {
    // Files stored encrypted on disk (AES-256-GCM)
    const fileBuffer = readAndDecryptFile(document.filePath)
    return new NextResponse(new Uint8Array(fileBuffer), {
      headers: {
        'Content-Type': document.mimeType ?? 'application/octet-stream',
        'Content-Disposition': `attachment; filename="${encodeURIComponent(document.name)}"`,
        'Cache-Control': 'private, no-cache, no-store',
        'Content-Length': fileBuffer.length.toString(),
      },
    })
  } catch {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}
