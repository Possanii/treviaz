import z from 'zod'

export const reserveSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  condominium_id: z.string().uuid(),
  space_name: z.string(),
  reserve_date: z.date(),
  start_time: z.date(),
  end_time: z.date(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'CANCELLED']),
  created_at: z.date(),
})

export type IReserve = z.infer<typeof reserveSchema>
