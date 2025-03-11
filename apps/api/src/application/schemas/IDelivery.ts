import { z } from 'zod'

export const DeliverySchema = z.object({
  id: z.string().uuid(),
  condominium_id: z.string().uuid(),
  user_id: z.string().uuid(),
  status: z.enum(['PENDING', 'DELIVERED', 'CANCELLED']),
})

export type IDelivery = z.infer<typeof DeliverySchema>
