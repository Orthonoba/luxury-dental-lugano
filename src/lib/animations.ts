import type { Variants } from 'framer-motion'

export const LUXURY_EASE = [0.22, 1, 0.36, 1] as const

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: LUXURY_EASE },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: LUXURY_EASE },
  },
}

export const stagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

export const scaleIn: Variants = {
  hidden: { scale: 0.9, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 16 },
  },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: LUXURY_EASE },
  },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: LUXURY_EASE },
  },
}

export const floatAnimation = {
  y: [0, -12, 0] as number[],
  transition: {
    duration: 6,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
}

export const floatSlow = {
  y: [0, -8, 0] as number[],
  transition: {
    duration: 8,
    repeat: Infinity,
    ease: 'easeInOut' as const,
  },
}

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: LUXURY_EASE },
  },
}

export const blurIn: Variants = {
  hidden: { opacity: 0, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: LUXURY_EASE },
  },
}

export const hoverLift = {
  rest: { y: 0, scale: 1, transition: { duration: 0.4, ease: LUXURY_EASE } },
  hover: { y: -6, scale: 1.01, transition: { duration: 0.4, ease: LUXURY_EASE } },
}

export const hoverGlow = {
  rest: { boxShadow: '0 0 0px 0px rgba(85,107,47,0)' },
  hover: { boxShadow: '0 20px 60px -12px rgba(85,107,47,0.2)' },
}

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

export const staggerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
}

export const revealLine: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.9, ease: LUXURY_EASE },
  },
}

export const popIn: Variants = {
  hidden: { scale: 0.85, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
}
