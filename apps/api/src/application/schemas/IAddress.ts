import { z } from 'zod'

export const addressSchema = z.object({
  id: z.string().uuid(),
  street: z.string().min(1, 'Street is required'),
  number: z.string().min(1, 'Number is required'),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, 'Neighborhood is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
  zip_code: z.string().min(1, 'ZIP code is required'),
})

export type IAddress = z.infer<typeof addressSchema>
