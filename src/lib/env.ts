import { z } from 'zod'

const envSchema = z.object({
  // Required at runtime
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  ADMIN_TOKEN: z.string().min(16, 'ADMIN_TOKEN must be at least 16 characters'),

  // Optional — enables email notifications when set
  RESEND_API_KEY: z.string().optional(),
  ADMIN_EMAIL: z.string().email().optional(),

  // Optional — enables AI chatbot when set
  OPENAI_API_KEY: z.string().optional(),

  // Sanity CMS — required at build time, optional at runtime (baked into bundle)
  NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_SANITY_DATASET: z.string().optional(),
  NEXT_PUBLIC_SANITY_API_VERSION: z.string().optional(),
})

// Validate on module load — fails fast with clear error messages in production
const parsed = envSchema.safeParse(process.env)

if (!parsed.success) {
  const missing = parsed.error.issues
    .map((i) => `  ${i.path.join('.')}: ${i.message}`)
    .join('\n')
  throw new Error(`[env] Invalid environment variables:\n${missing}`)
}

export const env = parsed.data
