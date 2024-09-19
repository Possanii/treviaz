import z from 'zod'

export const serviceOwnerSchema = z.object({
  id: z.string().uuid(),
  name: z.string({
    message: 'Please, provide a valid name.',
  }),
  email: z.string().email({
    message: 'Please, provide a valid email address.',
  }),
  phone: z.string({
    message: 'Please, provide a valid phone number.',
  }),
})

export type IServiceOwner = z.infer<typeof serviceOwnerSchema>
