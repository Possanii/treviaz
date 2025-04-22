import { z } from 'zod'

export const leisureAreaSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Leisure area name is required'),
  description: z.string().optional(),
  photo_url: z.string().url().optional(),
  createdAt: z.date(),
})

export type ILeisureArea = z.infer<typeof leisureAreaSchema>
