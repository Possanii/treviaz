import { z } from 'zod'

import { addressSchema } from './IAddress'

export const condominiumSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, 'Condominium name is required'),
  slug: z.string(),
  address: addressSchema,
  address_id: z.string().uuid(),
  photo_url: z.string().url().optional(),
  owner_id: z.string().uuid(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type ICondominium = z.infer<typeof condominiumSchema>
