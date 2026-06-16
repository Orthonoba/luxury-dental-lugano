import { NextRequest, NextResponse } from 'next/server'
import { parseWebhookPayload, sendWhatsAppText, markMessageRead } from '@/lib/whatsapp'
import { getOrCreateConversation, appendToConversation, generateAIResponse } from '@/lib/ai-agent'

// ── Webhook verification (GET) ────────────────────────────────────────────────
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  if (mode === 'subscribe' && token === process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN) {
    return new NextResponse(challenge, { status: 200 })
  }
  return new NextResponse('Forbidden', { status: 403 })
}

// ── Message handler (POST) ────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // Acknowledge immediately — Meta expects 200 within 20s
  const body = await request.json().catch(() => null)

  // Process asynchronously (don't await)
  handleMessages(body).catch(err => console.error('[WA Webhook]', err))

  return NextResponse.json({ status: 'ok' })
}

async function handleMessages(payload: unknown) {
  const messages = parseWebhookPayload(payload)

  for (const msg of messages) {
    if (msg.type !== 'text' || !msg.text) continue

    // Mark as read
    await markMessageRead(msg.messageId).catch(() => {})

    // Get or create conversation context
    const ctx = getOrCreateConversation(msg.from, msg.profileName)

    // Append user message
    appendToConversation(ctx, 'user', msg.text)

    try {
      // Generate AI response
      const reply = await generateAIResponse(ctx.history, ctx.patientName)

      // Send reply
      await sendWhatsAppText({ to: msg.from, body: reply })

      // Append assistant response to history
      appendToConversation(ctx, 'assistant', reply)
    } catch (err) {
      console.error('[WA AI Agent error]', err)
      // Fallback message
      await sendWhatsAppText({
        to: msg.from,
        body: 'Grazie per il messaggio! Il nostro team ti risponderà il prima possibile. 🦷',
      }).catch(() => {})
    }
  }
}
