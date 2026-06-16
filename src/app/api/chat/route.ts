import { NextRequest, NextResponse } from 'next/server'
import { createRateLimiter } from '@/lib/rateLimit'

const isRateLimited = createRateLimiter(20, 60_000) // 20 req/min per IP

const FAQ = [
  {
    a: 'Digital Smile Design (DSD) is our signature treatment — a 3D digital preview of your transformed smile before any procedure begins. It combines facial analysis, photography, and advanced software to craft a result unique to you.',
    keywords: ['digital smile design', 'dsd', 'smile design', '3d', 'smile preview'],
  },
  {
    a: 'We offer flexible financing options for comprehensive treatments. Please contact us directly at +41 91 994 50 51 or info@luxurydental.ch to discuss a plan tailored to your needs.',
    keywords: ['payment', 'financing', 'installment', 'cost', 'price', 'how much', 'afford'],
  },
  {
    a: 'You can book a consultation via our Contact page, by calling +41 91 994 50 51, or by WhatsApp. We typically respond within a few hours during business hours.',
    keywords: ['book', 'appointment', 'consultation', 'schedule', 'visit', 'reserve'],
  },
  {
    a: 'Absolutely. We welcome patients from across Europe and Latin America. Our team speaks English, Spanish, Italian, German, and French. Please visit our International Patients page for travel and accommodation guidance.',
    keywords: ['international', 'abroad', 'travel', 'foreign', 'latin', 'english', 'tourist', 'dental tourism'],
  },
  {
    a: 'We are located at Via Generale Guisan 5, 6900 Paradiso, Lugano, Switzerland.',
    keywords: ['address', 'location', 'where', 'directions', 'how to get', 'map', 'find you'],
  },
  {
    a: 'Monday to Friday: 9:00 – 19:00. Saturday: 10:00 – 17:00. We are closed on Sundays.',
    keywords: ['hours', 'open', 'schedule', 'time', 'when', 'timetable', 'available'],
  },
  {
    a: 'We offer a full range of treatments: Digital Smile Design, porcelain veneers, clear aligners, teeth whitening, dental implants, sleep dentistry (conscious sedation), custom mouthguards, retainers, and advanced facial aesthetics.',
    keywords: ['treatment', 'service', 'offer', 'veneer', 'implant', 'aligner', 'whitening', 'what do you do'],
  },
  {
    a: 'Conscious sedation (sleep dentistry) allows you to receive dental care in a completely relaxed state. It is ideal for anxious patients, phobia, or lengthy multi-treatment sessions. You remain conscious but deeply comfortable throughout.',
    keywords: ['sedation', 'sleep dentistry', 'anxiety', 'fear', 'phobia', 'scared', 'nervous', 'calm'],
  },
  {
    a: 'Our team includes Dott. Andrea Calandrino (Medical Director & Dentist) and Dott. Francesco Samper. Both specialise in cosmetic dentistry, facial aesthetics, and digital smile design.',
    keywords: ['doctor', 'dentist', 'team', 'staff', 'who', 'dr', 'specialist', 'expert'],
  },
]

function matchFaq(message: string): string | null {
  const lower = message.toLowerCase()
  for (const entry of FAQ) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.a
    }
  }
  return null
}

const FALLBACK =
  "I'm not sure about that specific question — please contact us directly at info@luxurydental.ch or call +41 91 994 50 51 and our team will be happy to help."

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const { message } = await request.json()
    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
    }

    const faqAnswer = matchFaq(message)

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ reply: faqAnswer ?? FALLBACK })
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        max_tokens: 220,
        messages: [
          {
            role: 'system',
            content:
              'You are a helpful assistant for Luxury Dental Paradiso, a premium dental and facial aesthetics clinic located at Via Riva Paradiso 4, Lugano, Switzerland. Answer concisely in the same language the user writes in. Never provide medical diagnoses. Always encourage booking a consultation for specific clinical concerns. Keep responses under 3 sentences.',
          },
          { role: 'user', content: message },
        ],
      }),
    })

    if (!response.ok) {
      return NextResponse.json({ reply: faqAnswer ?? FALLBACK })
    }

    const data = (await response.json()) as { choices: { message: { content: string } }[] }
    return NextResponse.json({ reply: data.choices[0]?.message?.content ?? FALLBACK })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
