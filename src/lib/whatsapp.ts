const WA_BASE = 'https://graph.facebook.com/v21.0'

function getConfig() {
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID
  if (!accessToken || !phoneNumberId) {
    throw new Error('WHATSAPP_ACCESS_TOKEN and WHATSAPP_PHONE_NUMBER_ID are required')
  }
  return { accessToken, phoneNumberId }
}

export interface WATextMessage {
  to: string
  body: string
  previewUrl?: boolean
}

export async function sendWhatsAppText({ to, body, previewUrl = false }: WATextMessage): Promise<string> {
  const { accessToken, phoneNumberId } = getConfig()

  const res = await fetch(`${WA_BASE}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: { body, preview_url: previewUrl },
    }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message ?? 'WhatsApp API error')
  return data.messages?.[0]?.id
}

export async function sendWhatsAppTemplate({
  to,
  templateName,
  languageCode = 'it',
  components = [],
}: {
  to: string
  templateName: string
  languageCode?: string
  components?: object[]
}): Promise<string> {
  const { accessToken, phoneNumberId } = getConfig()

  const res = await fetch(`${WA_BASE}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      to,
      type: 'template',
      template: { name: templateName, language: { code: languageCode }, components },
    }),
  })

  const data = await res.json()
  if (!res.ok) throw new Error(data.error?.message ?? 'WhatsApp API error')
  return data.messages?.[0]?.id
}

// ── Mark message as read ──────────────────────────────────────────────────────
export async function markMessageRead(messageId: string): Promise<void> {
  const { accessToken, phoneNumberId } = getConfig()
  await fetch(`${WA_BASE}/${phoneNumberId}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', status: 'read', message_id: messageId }),
  })
}

// ── Webhook message types ─────────────────────────────────────────────────────
export interface IncomingMessage {
  from: string
  messageId: string
  timestamp: string
  type: 'text' | 'image' | 'audio' | 'document' | 'interactive' | 'button' | 'unknown'
  text?: string
  displayPhoneNumber?: string
  profileName?: string
}

export function parseWebhookPayload(body: unknown): IncomingMessage[] {
  const messages: IncomingMessage[] = []
  try {
    const payload = body as Record<string, unknown>
    const entries = (payload?.entry as unknown[]) ?? []
    for (const entry of entries) {
      const e = entry as Record<string, unknown>
      const changes = (e?.changes as unknown[]) ?? []
      for (const change of changes) {
        const c = change as Record<string, unknown>
        if ((c?.field as string) !== 'messages') continue
        const value = c.value as Record<string, unknown>
        const msgs = (value?.messages as unknown[]) ?? []
        const meta = (value?.metadata as Record<string, unknown>) ?? {}
        const contacts = (value?.contacts as unknown[]) ?? []
        for (const msg of msgs) {
          const m = msg as Record<string, unknown>
          const contact = (contacts[0] as Record<string, unknown>) ?? {}
          const profile = (contact?.profile as Record<string, unknown>) ?? {}
          messages.push({
            from: m.from as string,
            messageId: m.id as string,
            timestamp: m.timestamp as string,
            type: (m.type as IncomingMessage['type']) ?? 'unknown',
            text: ((m.text as Record<string, unknown>)?.body as string) ?? undefined,
            displayPhoneNumber: meta?.display_phone_number as string,
            profileName: profile?.name as string,
          })
        }
      }
    }
  } catch {
    // Malformed payload — return empty
  }
  return messages
}
