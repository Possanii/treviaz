import z from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  name: z.string({
    message: 'Please, provide a valid name.',
  }),
  email: z.string().email({
    message: 'Please, provide a valid email address.',
  }),
  avatar_url: z
    .string()
    .url({
      message: 'Please, provide a valid photo URL.',
    })
    .nullish(),
})

export type IUser = z.infer<typeof userSchema>
