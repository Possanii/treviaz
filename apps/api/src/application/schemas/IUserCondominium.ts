import { roleEnum } from '@treviaz/entities/schemas/IRole'
import z from 'zod'

import { condominiumSchema } from './ICondominium'
import { userSchema } from './IUser'

export const userCondominiumSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  user: userSchema,
  condominium_id: z.string().uuid(),
  condominium: condominiumSchema,
  role: roleEnum,
  joined_at: z.date(),
})

export type IUserCondominium = z.infer<typeof userCondominiumSchema>
