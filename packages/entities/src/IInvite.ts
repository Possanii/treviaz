import z from 'zod'

import { roleEnum } from './IRole'

export const inviteStatusSchema = z.enum([
  'PENDING',
  'ACCEPTED',
  'DENIED',
  'REVOKED',
])

export const inviteSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  token: z.string(),
  status: inviteStatusSchema,
  sent_at: z.date(),
  expires_at: z.date(),
  condominium_id: z.string().uuid(),
  role: roleEnum,
  authorId: z.string().uuid(),
})

export type IInvite = z.infer<typeof inviteSchema>
