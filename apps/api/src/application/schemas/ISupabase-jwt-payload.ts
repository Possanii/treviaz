import { z } from 'zod'

export const supabaseJwtSchema = z.object({
  iss: z.string().url(),
  uid: z.string().uuid(),
  sub: z.string().uuid(),
  aud: z.string(),
  exp: z.number(),
  iat: z.number(),
  email: z.string().email(),
  phone: z.string(),
  app_metadata: z.object({
    provider: z.string(),
    providers: z.array(z.string()),
  }),
  user_metadata: z.object({
    email: z.string().email(),
    email_verified: z.boolean(),
    name: z.string(),
    phone_verified: z.boolean(),
    sub: z.string().uuid(),
  }),
  role: z.string(),
  aal: z.string(),
  amr: z.array(z.object({ method: z.string(), timestamp: z.number() })),
  session_id: z.string().uuid(),
  is_anonymous: z.boolean(),
})

export type ISupabaseJwtSchema = z.infer<typeof supabaseJwtSchema>
