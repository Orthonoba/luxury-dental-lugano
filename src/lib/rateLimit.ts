/**
 * Creates a reusable in-memory rate limiter with time-based cleanup.
 * @param limit  Max requests per window
 * @param windowMs  Window size in milliseconds
 */
export function createRateLimiter(limit: number, windowMs: number) {
  const map = new Map<string, { count: number; resetAt: number }>()

  return function isRateLimited(ip: string): boolean {
    const now = Date.now()

    // Clean up expired entries periodically (keep map small)
    if (map.size > 5_000) {
      for (const [key, val] of map) {
        if (now > val.resetAt) map.delete(key)
      }
    }

    const entry = map.get(ip)
    if (!entry || now > entry.resetAt) {
      map.set(ip, { count: 1, resetAt: now + windowMs })
      return false
    }

    entry.count++
    return entry.count > limit
  }
}
