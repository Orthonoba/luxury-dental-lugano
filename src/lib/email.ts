import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? 'info@luxurydental.ch'
const FROM_EMAIL = 'CRM Luxury Dental <noreply@luxurydental.ch>'

interface LeadData {
  name: string
  email: string
  phone?: string | null
  message?: string | null
}

/** Sends a new-lead notification to the clinic admin. No-ops silently if RESEND_API_KEY is not set. */
export async function sendLeadNotification(lead: LeadData): Promise<void> {
  if (!resend) return

  const subject = `New patient enquiry — ${lead.name}`
  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #0a0d06; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <p style="margin: 0; color: #C8A96B; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">
          Luxury Dental &amp; Facial Estética
        </p>
        <h1 style="margin: 8px 0 0; color: #fff; font-size: 20px; font-weight: 600;">New Patient Enquiry</h1>
      </div>
      <div style="border: 1px solid #e8e0d5; border-top: none; padding: 28px 32px; border-radius: 0 0 8px 8px; background: #fdfaf7;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #888; font-size: 12px; width: 100px; vertical-align: top;">Name</td>
            <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${escHtml(lead.name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #888; font-size: 12px; vertical-align: top;">Email</td>
            <td style="padding: 8px 0; font-size: 14px;">
              <a href="mailto:${escHtml(lead.email)}" style="color: #6b7f3a;">${escHtml(lead.email)}</a>
            </td>
          </tr>
          ${lead.phone ? `
          <tr>
            <td style="padding: 8px 0; color: #888; font-size: 12px; vertical-align: top;">Phone</td>
            <td style="padding: 8px 0; font-size: 14px;">${escHtml(lead.phone)}</td>
          </tr>` : ''}
          ${lead.message ? `
          <tr>
            <td style="padding: 8px 0; color: #888; font-size: 12px; vertical-align: top;">Message</td>
            <td style="padding: 8px 0; font-size: 14px; white-space: pre-wrap;">${escHtml(lead.message)}</td>
          </tr>` : ''}
        </table>
        <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e8e0d5;">
          <a href="https://www.luxurydental.ch/crm"
             style="display: inline-block; background: #6b7f3a; color: #fff; padding: 10px 24px;
                    border-radius: 100px; font-size: 12px; text-decoration: none; letter-spacing: 0.08em;">
            View in CRM →
          </a>
        </div>
      </div>
    </div>
  `

  await resend.emails.send({
    from: FROM_EMAIL,
    to: ADMIN_EMAIL,
    subject,
    html,
  })
}

function escHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
