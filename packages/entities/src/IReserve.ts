import { z } from 'zod'

export const reserveStatusSchema = z.enum([
  'PENDING',
  'APPROVED',
  'REJECTED',
  'CANCELLED',
])

export const reserveSchema = z.object({
  id: z.string().uuid(),
  start_date: z.date(),
  end_date: z.date(),
  status: reserveStatusSchema,
})

export type IReserve = z.infer<typeof reserveSchema>
