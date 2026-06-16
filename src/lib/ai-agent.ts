import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const SYSTEM_PROMPT = `You are Sofia, the virtual assistant of Luxury Dental Paradiso in Lugano, Switzerland.
You speak fluently in the patient's language: Italian, English, Spanish, German, or French.
Detect the language from the patient's message and always reply in the same language.

Your role:
- Answer questions about dental and facial aesthetic treatments
- Provide clinic information (Via Cantonale 6, Lugano — +41 91 123 4567)
- Help patients request appointments (Mon-Fri 09:00-17:30, Sat 09:00-12:30)
- Explain procedures briefly and reassuringly
- Direct urgent dental emergencies to call the clinic immediately
- If asked about prices, say "our team will provide a personalised quote"

Tone: warm, professional, elegant — like the clinic's brand.
Never diagnose. Never promise specific outcomes. Never discuss competitors.
Keep replies concise (3-5 sentences max). Use the patient's name when known.

If the patient wants to book: ask for their preferred date/time, then say "I'm passing your request to our team who will confirm shortly."
`

interface Message { role: 'user' | 'assistant'; content: string }

export async function generateAIResponse(
  conversationHistory: Message[],
  patientName?: string,
): Promise<string> {
  const systemWithName = patientName
    ? SYSTEM_PROMPT.replace('the patient', patientName)
    : SYSTEM_PROMPT

  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 400,
    system: systemWithName,
    messages: conversationHistory,
  })

  const block = response.content[0]
  if (block.type !== 'text') return "Mi dispiace, riprova tra un momento."
  return block.text
}

export interface ConversationContext {
  from: string
  history: Message[]
  patientName?: string
}

// In-memory conversation cache (per phone number, 30 min TTL)
const conversationCache = new Map<string, { context: ConversationContext; expiresAt: number }>()
const TTL_MS = 30 * 60 * 1000

export function getOrCreateConversation(from: string, patientName?: string): ConversationContext {
  const now = Date.now()
  const cached = conversationCache.get(from)
  if (cached && cached.expiresAt > now) {
    return cached.context
  }
  const context: ConversationContext = { from, history: [], patientName }
  conversationCache.set(from, { context, expiresAt: now + TTL_MS })
  return context
}

export function appendToConversation(ctx: ConversationContext, role: 'user' | 'assistant', content: string): void {
  ctx.history.push({ role, content })
  // Keep last 20 messages to stay within token budget
  if (ctx.history.length > 20) ctx.history.splice(0, ctx.history.length - 20)
  // Refresh TTL
  conversationCache.set(ctx.from, { context: ctx, expiresAt: Date.now() + TTL_MS })
}

export function clearConversation(from: string): void {
  conversationCache.delete(from)
}
