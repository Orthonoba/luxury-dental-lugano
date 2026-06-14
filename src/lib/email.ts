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

interface PatientConfirmationData {
  name: string
  email: string
  service?: string | null
}

/** Sends a booking confirmation to the patient. No-ops silently if RESEND_API_KEY is not set. */
export async function sendPatientConfirmation(data: PatientConfirmationData): Promise<void> {
  if (!resend) return

  const firstName = escHtml(data.name.split(' ')[0])
  const serviceRow = data.service
    ? `<tr>
        <td style="padding: 8px 0; color: #888; font-size: 12px; width: 140px; vertical-align: top;">Servizio / Service</td>
        <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${escHtml(data.service)}</td>
      </tr>`
    : ''

  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #0a0d06; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <p style="margin: 0; color: #C8A96B; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">
          Luxury Dental &amp; Facial Estética — Lugano
        </p>
        <h1 style="margin: 8px 0 0; color: #fff; font-size: 20px; font-weight: 600;">Grazie per averci contattato</h1>
        <p style="margin: 4px 0 0; color: #aaa; font-size: 13px;">Thank you for reaching out</p>
      </div>
      <div style="border: 1px solid #e8e0d5; border-top: none; padding: 28px 32px; border-radius: 0 0 8px 8px; background: #fdfaf7;">
        <p style="font-size: 15px; line-height: 1.6; margin: 0 0 12px;">
          Caro/a <strong>${firstName}</strong>,<br/>
          abbiamo ricevuto la sua richiesta e la contatteremo entro <strong>24 ore</strong>.
        </p>
        <p style="font-size: 13px; color: #666; line-height: 1.6; margin: 0 0 20px;">
          <em>Dear ${firstName}, we have received your enquiry and will be in touch within 24 hours.</em>
        </p>
        ${serviceRow ? `<table style="width: 100%; border-collapse: collapse; border-top: 1px solid #e8e0d5; padding-top: 16px; margin-top: 4px;">${serviceRow}</table>` : ''}
        <div style="margin-top: 24px; padding: 20px; background: #f5f0e8; border-radius: 8px;">
          <p style="margin: 0 0 8px; font-size: 12px; color: #888; letter-spacing: 0.1em; text-transform: uppercase;">Contatti diretti / Direct contact</p>
          <p style="margin: 0; font-size: 13px; line-height: 2;">
            📞 <a href="tel:+41919945051" style="color: #6b7f3a; text-decoration: none;">+41 91 994 5051</a><br/>
            📧 <a href="mailto:info@luxurydental.ch" style="color: #6b7f3a; text-decoration: none;">info@luxurydental.ch</a><br/>
            📍 Via Riva Paradiso 4, 6900 Paradiso, Lugano (TI)
          </p>
        </div>
        <p style="margin: 20px 0 0; font-size: 12px; color: #aaa; text-align: center;">
          Luxury Dental &amp; Facial Estética — Precisione svizzera, bellezza naturale.
        </p>
      </div>
    </div>
  `

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: 'Luxury Dental — Abbiamo ricevuto la sua richiesta / We received your enquiry',
    html,
  })
}

// ── Booking request emails ──────────────────────────────────────────────────

interface BookingNotificationData {
  type: 'dental' | 'facial'
  firstName: string
  lastName: string
  email: string
  phone: string
  service: string
  desiredDate: string
  desiredTime: string
  bookingId: string
}

interface BookingConfirmationData {
  type: 'dental' | 'facial'
  firstName: string
  email: string
  service: string
  desiredDate: string
  desiredTime: string
}

/** Admin notification for a new booking request. No-ops silently if RESEND_API_KEY is not set. */
export async function sendBookingNotification(data: BookingNotificationData): Promise<void> {
  if (!resend) return

  const typeLabel = data.type === 'dental' ? 'Odontología Avanzada' : 'Estética Facial'
  const subject = `Nueva reserva ${typeLabel} — ${data.firstName} ${data.lastName}`

  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #0a0d06; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <p style="margin: 0; color: #C8A96B; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">
          Luxury Dental — ${escHtml(typeLabel)}
        </p>
        <h1 style="margin: 8px 0 0; color: #fff; font-size: 20px; font-weight: 600;">Nueva Solicitud de Cita</h1>
      </div>
      <div style="border: 1px solid #e8e0d5; border-top: none; padding: 28px 32px; border-radius: 0 0 8px 8px; background: #fdfaf7;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #888; font-size: 12px; width: 130px;">Nombre</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${escHtml(data.firstName)} ${escHtml(data.lastName)}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 12px;">Email</td>
              <td style="padding: 8px 0; font-size: 14px;"><a href="mailto:${escHtml(data.email)}" style="color:#6b7f3a">${escHtml(data.email)}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 12px;">Teléfono</td>
              <td style="padding: 8px 0; font-size: 14px;">${escHtml(data.phone)}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 12px;">Servicio</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #6b7f3a;">${escHtml(data.service)}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 12px;">Fecha</td>
              <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${escHtml(data.desiredDate)} a las ${escHtml(data.desiredTime)}</td></tr>
          <tr><td style="padding: 8px 0; color: #888; font-size: 12px;">ID</td>
              <td style="padding: 8px 0; font-size: 11px; color: #aaa; font-family: monospace;">${escHtml(data.bookingId)}</td></tr>
        </table>
        <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e8e0d5;">
          <a href="https://www.luxurydental.ch/crm"
             style="display: inline-block; background: #6b7f3a; color: #fff; padding: 10px 24px;
                    border-radius: 100px; font-size: 12px; text-decoration: none; letter-spacing: 0.08em;">
            Ver en CRM →
          </a>
        </div>
      </div>
    </div>
  `

  await resend.emails.send({ from: FROM_EMAIL, to: ADMIN_EMAIL, subject, html })
}

/** Patient confirmation email for a booking request. No-ops silently if RESEND_API_KEY is not set. */
export async function sendBookingConfirmation(data: BookingConfirmationData): Promise<void> {
  if (!resend) return

  const typeLabel = data.type === 'dental' ? 'Odontología Avanzada' : 'Estética Facial'
  const firstName = escHtml(data.firstName)

  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
      <div style="background: #0a0d06; padding: 24px 32px; border-radius: 8px 8px 0 0;">
        <p style="margin: 0; color: #C8A96B; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;">
          Luxury Dental &amp; Facial Estética — Lugano
        </p>
        <h1 style="margin: 8px 0 0; color: #fff; font-size: 20px; font-weight: 600;">Su cita ha sido solicitada</h1>
        <p style="margin: 4px 0 0; color: #aaa; font-size: 13px;">Your appointment request has been received</p>
      </div>
      <div style="border: 1px solid #e8e0d5; border-top: none; padding: 28px 32px; border-radius: 0 0 8px 8px; background: #fdfaf7;">
        <p style="font-size: 15px; line-height: 1.6; margin: 0 0 16px;">
          Estimado/a <strong>${firstName}</strong>,<br/>
          hemos recibido su solicitud de cita. Le confirmaremos la disponibilidad en un plazo de <strong>24 horas</strong>.
        </p>
        <div style="background: #f5f0e8; border-radius: 10px; padding: 20px; margin: 0 0 20px;">
          <p style="margin: 0 0 8px; font-size: 11px; color: #888; letter-spacing: 0.1em; text-transform: uppercase;">Detalles de su solicitud</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 5px 0; color: #888; font-size: 12px; width: 100px;">Servicio</td>
                <td style="padding: 5px 0; font-size: 13px; font-weight: 600;">${escHtml(data.service)}</td></tr>
            <tr><td style="padding: 5px 0; color: #888; font-size: 12px;">Área</td>
                <td style="padding: 5px 0; font-size: 13px;">${escHtml(typeLabel)}</td></tr>
            <tr><td style="padding: 5px 0; color: #888; font-size: 12px;">Fecha</td>
                <td style="padding: 5px 0; font-size: 13px; font-weight: 600;">${escHtml(data.desiredDate)} — ${escHtml(data.desiredTime)}</td></tr>
          </table>
        </div>
        <div style="padding: 20px; background: #fff; border: 1px solid #e8e0d5; border-radius: 8px;">
          <p style="margin: 0 0 8px; font-size: 12px; color: #888; letter-spacing: 0.1em; text-transform: uppercase;">Contacto directo</p>
          <p style="margin: 0; font-size: 13px; line-height: 2;">
            📞 <a href="tel:+41919945051" style="color: #6b7f3a; text-decoration: none;">+41 91 994 5051</a><br/>
            📧 <a href="mailto:info@luxurydental.ch" style="color: #6b7f3a; text-decoration: none;">info@luxurydental.ch</a><br/>
            📍 Via Riva Paradiso 4, 6900 Paradiso, Lugano (TI)
          </p>
        </div>
        <p style="margin: 20px 0 0; font-size: 12px; color: #aaa; text-align: center;">
          Luxury Dental &amp; Facial Estética — Precisione svizzera, bellezza naturale.
        </p>
      </div>
    </div>
  `

  await resend.emails.send({
    from: FROM_EMAIL,
    to: data.email,
    subject: `Luxury Dental — Solicitud de cita recibida · ${data.desiredDate} ${data.desiredTime}`,
    html,
  })
}
