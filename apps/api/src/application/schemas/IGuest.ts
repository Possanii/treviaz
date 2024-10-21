import { z } from 'zod'

export const guestSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  condominium_id: z.string().uuid(),
  qr_code: z.string(),
  valid_from: z.date(),
  valid_until: z.date(),
  created_at: z.date(),
})

export type IGuest = z.infer<typeof guestSchema>
