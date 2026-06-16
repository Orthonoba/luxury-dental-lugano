import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

const COOKIE_NAME = 'portal_session'
const JWT_SECRET = process.env.JWT_SECRET ?? 'dev-secret-change-in-production'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export type SessionPayload = {
  userId: string
  email: string
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN'
  patientId?: string
}

// ── Password utilities ─────────────────────────────────────────────────────

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

// ── JWT utilities ──────────────────────────────────────────────────────────

export function signToken(payload: SessionPayload, rememberMe = false): string {
  const expiresIn = rememberMe ? '30d' : '7d'
  return jwt.sign(payload, JWT_SECRET, { expiresIn })
}

export function verifyToken(token: string): SessionPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as SessionPayload
  } catch {
    return null
  }
}

// ── Cookie helpers ─────────────────────────────────────────────────────────

export function buildSessionCookie(token: string, rememberMe = false) {
  return {
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    maxAge: rememberMe ? COOKIE_MAX_AGE * 4 : COOKIE_MAX_AGE,
    path: '/',
  }
}

// ── Server-side session getter (Server Components & API routes) ────────────

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies()
  const token = cookieStore.get(COOKIE_NAME)?.value
  if (!token) return null
  return verifyToken(token)
}

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession()
  if (!session) throw new Error('Unauthorized')
  return session
}

export async function requirePatientSession(): Promise<SessionPayload> {
  const session = await requireSession()
  if (session.role !== 'PATIENT') throw new Error('Forbidden')
  return session
}

// ── Token for password reset (random hex, stored in DB) ───────────────────

export function generateResetToken(): string {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, (b) => b.toString(16).padStart(2, '0')).join('')
}
