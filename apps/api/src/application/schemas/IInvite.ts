import z from 'zod'

export const inviteSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  token: z.string(),
  status: z.enum(['PENDING', 'ACCEPTED', 'DENIED', 'REVOKED']),
  sent_at: z.date(),
  expires_at: z.date(),
  condominium_id: z.string().uuid(),
  role: z.enum(['RESIDENT', 'ADMIN', 'SYNDIC', 'BILLING', 'SERVICES']),
  author_id: z.string().uuid(),
})

export type IInvite = z.infer<typeof inviteSchema>
