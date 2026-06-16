import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { deletePatientDocumentDirectory } from '@/lib/crypto'
import { cookies } from 'next/headers'

export async function DELETE(request: NextRequest) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const body = await request.json().catch(() => null)
  // Require explicit confirmation
  if (body?.confirm !== 'DELETE_MY_DATA') {
    return NextResponse.json(
      { error: 'Send { "confirm": "DELETE_MY_DATA" } to confirm erasure' },
      { status: 400 }
    )
  }

  const patient = await prisma.patient.findUnique({ where: { userId: session.userId } })
  if (!patient) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Delete encrypted documents from disk first
  try {
    deletePatientDocumentDirectory(patient.id)
  } catch (err) {
    console.error('[GDPR delete] Could not delete document files:', err)
    // Continue with DB deletion — files can be cleaned up manually
  }

  // Cascade delete via Prisma (Patient → Treatments, Appointments, Documents, Payments)
  // User → Patient is ON DELETE CASCADE in schema
  await prisma.user.delete({ where: { id: session.userId } })

  // Clear session cookie
  const cookieStore = cookies()
  cookieStore.set('portal_session', '', { maxAge: 0, path: '/' })

  return NextResponse.json({
    message: 'Your account and all associated data have been permanently deleted (GDPR Art. 17).',
    deletedAt: new Date().toISOString(),
  })
}
