import { z } from 'zod'

export const roleSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  created_at: z.date(),
})

export type IRole = z.infer<typeof roleSchema>
