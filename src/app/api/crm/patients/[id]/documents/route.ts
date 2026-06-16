import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { encryptAndSaveFile } from '@/lib/crypto'

function isAuthorized(req: NextRequest): boolean {
  const token = req.cookies.get('admin_token')?.value
  return !!token && !!process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
}

// Accepts multipart/form-data with file + metadata fields
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  if (!isAuthorized(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const patient = await prisma.patient.findUnique({ where: { id: params.id } })
  if (!patient) return NextResponse.json({ error: 'Patient not found' }, { status: 404 })

  const contentType = request.headers.get('content-type') ?? ''

  // ── multipart upload (from CRM UI) ────────────────────────────────────────
  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData()
    const file = form.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })

    const docType = (form.get('type') as string) || 'OTHER'
    const name = (form.get('name') as string) || file.name
    const description = (form.get('description') as string) || undefined
    const uploadedBy = (form.get('uploadedBy') as string) || undefined
    const mimeType = file.type || 'application/octet-stream'

    if (file.size > 20 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large (max 20 MB)' }, { status: 413 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const { filePath, fileSize } = await encryptAndSaveFile(buffer, patient.id, file.name)

    const document = await prisma.document.create({
      data: {
        patientId: patient.id,
        type: docType as never,
        name,
        description,
        filePath,
        fileSize,
        mimeType,
        uploadedBy,
      },
    })

    return NextResponse.json(document, { status: 201 })
  }

  // ── JSON body (legacy / programmatic) ─────────────────────────────────────
  const body = await request.json().catch(() => null)
  if (!body?.filePath) return NextResponse.json({ error: 'filePath required' }, { status: 400 })

  const document = await prisma.document.create({
    data: {
      patientId: patient.id,
      type: body.type ?? 'OTHER',
      name: body.name,
      description: body.description,
      filePath: body.filePath,
      fileSize: body.fileSize,
      mimeType: body.mimeType,
      uploadedBy: body.uploadedBy,
    },
  })

  return NextResponse.json(document, { status: 201 })
}
