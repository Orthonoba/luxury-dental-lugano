/**
 * Mirrors the CSS custom properties defined in globals.css @theme block.
 * Use these in JS contexts: Framer Motion inline styles, canvas, dynamic SVGs.
 * For Tailwind classes, use the CSS variables directly (e.g. bg-gold, text-olive).
 */
export const COLORS = {
  beige: '#E8DCCB',
  beigeLight: '#F5F0E8',
  olive: '#556B2F',
  oliveLight: '#6B8A3C',
  gold: '#C8A96B',
  goldLight: '#D4B97A',
  luxuryBlack: '#111111',
  luxuryDark: '#1A1A1A',
  white: '#FFFFFF',
  whatsapp: '#25D366',
  whatsappDark: '#128C7E',
} as const

export type ColorKey = keyof typeof COLORS
