import { z } from 'zod'

export const leisureAreaSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  photo_url: z.string().optional(),
  condominiumId: z.string().uuid(),
  created_at: z.date(),
})

export type ILeisureArea = z.infer<typeof leisureAreaSchema>
