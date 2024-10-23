import { z } from 'zod'

export const roleSchema = z.enum([
  'RESIDENT',
  'ADMIN',
  'SYNDIC',
  'BILLING',
  'SERVICES',
])

export type IRole = z.infer<typeof roleSchema>
