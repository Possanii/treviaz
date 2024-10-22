import z from 'zod'

import { condominiumSchema } from './ICondominium'
import { userSchema } from './IUser'

export const userCondominiumSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  user: userSchema,
  condominium_id: z.string().uuid(),
  condominium: condominiumSchema,
  role: z.enum(['RESIDENT', 'ADMIN', 'SYNDIC', 'BILLING', 'SERVICES']),
  joined_at: z.date(),
})

export type IUserCondominium = z.infer<typeof userCondominiumSchema>
