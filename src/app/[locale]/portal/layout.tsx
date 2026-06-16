import { getSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import PortalNav from '@/components/portal/PortalNav'

export default async function PortalLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const session = await getSession()

  // Auth pages (login, forgot-password, reset-password) render without sidebar.
  // Individual protected pages handle their own session redirect.
  if (!session) {
    return <>{children}</>
  }

  const patient = await prisma.patient.findUnique({
    where: { userId: session.userId },
    select: { firstName: true, lastName: true },
  })

  const patientName = patient
    ? `${patient.firstName} ${patient.lastName}`
    : session.email

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <PortalNav patientName={patientName} locale={locale} />
      {/* Content offset for sidebar on desktop, top bar on mobile */}
      <main className="lg:pl-64 pt-14 lg:pt-0 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
