import { z } from 'zod'

export const roleEnum = z.enum([
  'RESIDENT',
  'ADMIN',
  'SYNDIC',
  'BILLING',
  'SERVICES',
])

export type IRoleEnum = z.infer<typeof roleEnum>

export const roleSchema = z.object({
  id: z.string().uuid(),
  name: roleEnum,
  description: z.string(),
  created_at: z.date(),
})

export type IRole = z.infer<typeof roleSchema>
