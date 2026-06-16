/**
 * Luxury Dental — WhatsApp Business Cloud API + Claude AI Agent
 * Standalone Node.js service (ESM)
 *
 * Uses ONLY the official Meta WhatsApp Business Cloud API
 * Never uses Baileys, whatsapp-web.js, or any unofficial library
 */

import http from 'http'
import Anthropic from '@anthropic-ai/sdk'

const PORT = process.env.PORT ?? 3010
const WA_BASE = 'https://graph.facebook.com/v21.0'
const ACCESS_TOKEN = process.env.WHATSAPP_ACCESS_TOKEN
const PHONE_NUMBER_ID = process.env.WHATSAPP_PHONE_NUMBER_ID
const VERIFY_TOKEN = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY

if (!ACCESS_TOKEN || !PHONE_NUMBER_ID || !VERIFY_TOKEN || !ANTHROPIC_API_KEY) {
  console.error('Missing required env vars: WHATSAPP_ACCESS_TOKEN, WHATSAPP_PHONE_NUMBER_ID, WHATSAPP_WEBHOOK_VERIFY_TOKEN, ANTHROPIC_API_KEY')
  process.exit(1)
}

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY })

// ── In-memory conversation store (30 min TTL) ─────────────────────────────────
const conversations = new Map()
const TTL = 30 * 60 * 1000
function getConversation(from) {
  const now = Date.now()
  const entry = conversations.get(from)
  if (entry && entry.expiresAt > now) return entry.messages
  const messages = []
  conversations.set(from, { messages, expiresAt: now + TTL })
  return messages
}
function appendMessage(from, role, content) {
  const messages = getConversation(from)
  messages.push({ role, content })
  if (messages.length > 20) messages.splice(0, messages.length - 20)
  if (conversations.has(from)) conversations.get(from).expiresAt = Date.now() + TTL
}

// ── Claude AI ─────────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Sofia, the virtual assistant of Luxury Dental Paradiso in Lugano, Switzerland.
Detect the language from the patient's message and always reply in the same language (Italian, English, Spanish, German, French).
Your role: answer questions about dental/facial aesthetic treatments, clinic hours (Mon-Fri 09:00-17:30, Sat 09:00-12:30),
help patients request appointments, and reassure them about procedures.
For prices always say "our team will provide a personalised quote".
Never diagnose. Keep replies under 5 sentences. Tone: warm, professional, elegant.`

async function generateReply(from, userMessage) {
  appendMessage(from, 'user', userMessage)
  const messages = getConversation(from)
  const res = await anthropic.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 400,
    system: SYSTEM_PROMPT,
    messages,
  })
  const reply = res.content[0]?.text ?? "Un momento, ti rispondo subito."
  appendMessage(from, 'assistant', reply)
  return reply
}

// ── WhatsApp API helpers ──────────────────────────────────────────────────────
async function sendText(to, body) {
  await fetch(`${WA_BASE}/${PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: { body },
    }),
  })
}

async function markRead(messageId) {
  await fetch(`${WA_BASE}/${PHONE_NUMBER_ID}/messages`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${ACCESS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ messaging_product: 'whatsapp', status: 'read', message_id: messageId }),
  })
}

// ── Parse webhook payload ─────────────────────────────────────────────────────
function parseMessages(payload) {
  const result = []
  for (const entry of payload?.entry ?? []) {
    for (const change of entry?.changes ?? []) {
      if (change?.field !== 'messages') continue
      for (const msg of change?.value?.messages ?? []) {
        if (msg.type === 'text' && msg.text?.body) {
          result.push({ from: msg.from, id: msg.id, text: msg.text.body })
        }
      }
    }
  }
  return result
}

// ── HTTP Server ───────────────────────────────────────────────────────────────
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`)

  // Health check
  if (url.pathname === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ status: 'ok', service: 'whatsapp-agent' }))
    return
  }

  // Webhook verify (GET)
  if (url.pathname === '/webhook' && req.method === 'GET') {
    const mode = url.searchParams.get('hub.mode')
    const token = url.searchParams.get('hub.verify_token')
    const challenge = url.searchParams.get('hub.challenge')
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      res.writeHead(200)
      res.end(challenge)
    } else {
      res.writeHead(403)
      res.end('Forbidden')
    }
    return
  }

  // Webhook message (POST)
  if (url.pathname === '/webhook' && req.method === 'POST') {
    let body = ''
    req.on('data', chunk => { body += chunk })
    req.on('end', async () => {
      // Always respond 200 immediately
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({ status: 'ok' }))

      try {
        const payload = JSON.parse(body)
        const messages = parseMessages(payload)
        for (const msg of messages) {
          await markRead(msg.id).catch(() => {})
          const reply = await generateReply(msg.from, msg.text)
          await sendText(msg.from, reply)
        }
      } catch (err) {
        console.error('[WA Agent] Error processing message:', err)
      }
    })
    return
  }

  res.writeHead(404)
  res.end('Not found')
})

server.listen(PORT, () => {
  console.log(`🤖 WhatsApp AI Agent running on port ${PORT}`)
  console.log(`   Webhook: POST /webhook`)
  console.log(`   Health:  GET  /health`)
})
