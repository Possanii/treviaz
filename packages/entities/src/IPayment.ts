import { z } from 'zod'

export const paymentSchema = z.object({
  id: z.string().uuid(),
  amountPaid: z.coerce.number(),
  paymentDate: z.date(),
  paymentMethod: z.string(),
  createdAt: z.date(),
})

export type IPayment = z.infer<typeof paymentSchema>
