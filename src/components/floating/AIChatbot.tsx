'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocale } from 'next-intl'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: 'Hello! I\'m the Luxury Dental assistant. How can I help you today? You can ask me about our treatments, booking, location, or languages.',
}

export default function AIChatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const locale = useLocale()

  useEffect(() => {
    if (open) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 200)
    }
  }, [messages, open])

  const send = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    const userMessage: Message = { role: 'user', content: trimmed }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, locale }),
      })
      if (!res.ok) throw new Error('Request failed')
      const data = (await res.json()) as { reply?: string; error?: string }
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply ?? 'Sorry, I could not process that. Please contact us directly.',
        },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Connection error. Please contact us at +41 91 994 50 51 or info@luxurydental.ch.',
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.5, type: 'spring', stiffness: 180, damping: 15 }}
      className="fixed bottom-8 left-6 z-50"
    >
      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-full left-0 mb-4 w-80 bg-[#0a0d06]/98 border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden flex flex-col"
            style={{ maxHeight: '440px' }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/8 shrink-0">
              <div className="w-7 h-7 rounded-full bg-gold flex items-center justify-center shrink-0">
                <span className="font-display font-bold text-white text-[11px]">LD</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold leading-none">Luxury Dental</p>
                <p className="text-white/30 text-[10px] mt-0.5">AI Assistant</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="ml-auto text-white/30 hover:text-white/60 transition-colors p-1"
                aria-label="Close chat"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ minHeight: '220px' }}>
              {messages.map((msg, i) => (
                <div key={i} className={msg.role === 'user' ? 'flex justify-end' : 'flex justify-start'}>
                  <div
                    className={
                      msg.role === 'user'
                        ? 'max-w-[80%] bg-olive text-white text-xs px-3.5 py-2.5 rounded-2xl rounded-br-sm leading-relaxed'
                        : 'max-w-[88%] bg-white/6 text-white/80 text-xs px-3.5 py-2.5 rounded-2xl rounded-bl-sm leading-relaxed'
                    }
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/6 text-white/35 text-xs px-3.5 py-2.5 rounded-2xl rounded-bl-sm">
                    <span className="inline-flex gap-1">
                      <span className="animate-pulse">•</span>
                      <span className="animate-pulse" style={{ animationDelay: '0.15s' }}>•</span>
                      <span className="animate-pulse" style={{ animationDelay: '0.3s' }}>•</span>
                    </span>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input row */}
            <div className="border-t border-white/8 px-3 py-3 flex gap-2 shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && send()}
                placeholder="Ask a question…"
                className="flex-1 bg-white/6 border border-white/10 rounded-xl px-3 py-2 text-white text-xs placeholder:text-white/25 focus:outline-none focus:border-gold/40 transition-colors min-w-0"
                disabled={loading}
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                aria-label="Send"
                className="w-8 h-8 rounded-xl bg-olive hover:bg-olive-light disabled:opacity-35 flex items-center justify-center transition-colors shrink-0"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close AI assistant' : 'Open AI assistant'}
        className="relative w-14 h-14 rounded-full bg-[#0a0d06]/90 border border-white/10 flex items-center justify-center shadow-xl shadow-black/30 hover:border-gold/40 hover:shadow-gold/15 transition-all duration-300 backdrop-blur-sm"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.svg
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </motion.svg>
          ) : (
            <motion.svg
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </motion.svg>
          )}
        </AnimatePresence>
        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-gold animate-pulse" />
      </button>
    </motion.div>
  )
}
