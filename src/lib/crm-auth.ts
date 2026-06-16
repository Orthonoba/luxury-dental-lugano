import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function requireCRMAuth(): Promise<void> {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_token')?.value
  const authorized = !!token && !!process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
  if (!authorized) redirect('/crm')
}

export async function isCRMAuthorized(): Promise<boolean> {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_token')?.value
  return !!token && !!process.env.ADMIN_TOKEN && token === process.env.ADMIN_TOKEN
}
