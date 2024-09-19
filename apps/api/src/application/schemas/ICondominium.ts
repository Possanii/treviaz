import z from 'zod'

export const condominiumSchema = z.object({
  id: z.string().uuid(),
  name: z.string({
    message: 'Please, provide a valid condominium name.',
  }),
  address: z.string({
    message: 'Please, provide a valid address.',
  }),
  photo_url: z
    .string()
    .url({
      message: 'Please, provide a valid photo URL.',
    })
    .optional(),
  owner_id: z.string().uuid({
    message: 'Please, provide a valid owner ID.',
  }),
})

export type ICondominium = z.infer<typeof condominiumSchema>
