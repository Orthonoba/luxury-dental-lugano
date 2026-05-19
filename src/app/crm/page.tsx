import { cookies } from 'next/headers'
import { prisma } from '@/lib/prisma'
import CRMContent from './CRMContent'

export const dynamic = 'force-dynamic'

export default async function CRMPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_token')?.value
  const authorized = !!token && !!process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN

  if (!authorized) {
    return (
      <CRMContent
        authorized={false}
        leads={[]}
        messages={[]}
        subscribers={[]}
      />
    )
  }

  const [leads, messages, subscribers] = await Promise.all([
    prisma.patientLead.findMany({ orderBy: { createdAt: 'desc' }, take: 500 }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' }, take: 500 }),
    prisma.newsletter.findMany({ orderBy: { createdAt: 'desc' }, take: 500 }),
  ])

  return (
    <CRMContent
      authorized={true}
      leads={leads}
      messages={messages}
      subscribers={subscribers}
    />
  )
}
