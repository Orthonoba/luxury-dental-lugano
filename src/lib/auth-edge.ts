/**
 * Edge-runtime-safe JWT helpers (no Node.js crypto).
 * Used only in middleware for session existence / expiry checks.
 * Full signature verification happens in Server Components / API routes via auth.ts.
 */

export type SessionPayload = {
  userId: string
  email: string
  role: 'PATIENT' | 'DOCTOR' | 'ADMIN'
  patientId?: string
  exp?: number
}

/**
 * Decodes a JWT without verifying the signature.
 * Suitable only for middleware redirect decisions — real auth gates
 * in Server Components and API routes always call the full verifyToken().
 */
export function decodeTokenEdge(token: string): SessionPayload | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null

    // Base64url → base64 → decode
    const payloadB64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const json = atob(payloadB64)
    const payload = JSON.parse(json) as SessionPayload & { exp?: number }

    // Check expiry
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null

    // Sanity check required fields
    if (!payload.userId || !payload.email || !payload.role) return null

    return payload
  } catch {
    return null
  }
}
