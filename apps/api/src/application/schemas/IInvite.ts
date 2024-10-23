import z from 'zod'

export const inviteSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  token: z.string(),
  status: z.enum(['PENDING', 'ACCEPTED', 'DENIED', 'REVOKED']),
  sent_at: z.date(),
  expires_at: z.date(),
})

export type IInvite = z.infer<typeof inviteSchema>
