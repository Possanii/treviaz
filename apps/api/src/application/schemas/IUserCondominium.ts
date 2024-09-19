import z from 'zod'

export const userCondominiumSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  condominium_id: z.string().uuid(),
  role: z.enum(['RESIDENT', 'ADMIN', 'SYNDIC', 'BILLING', 'SERVICES']), 
  joined_at: z.date(),
})

export type IUserCondominium = z.infer<typeof userCondominiumSchema>
