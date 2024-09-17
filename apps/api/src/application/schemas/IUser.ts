import z from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email({
    message: 'Please, provide a valid email address.',
  }),
  name: z.string({
    message: 'Please, provide a valid name.',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters.',
  }),
  avatar_url: z
    .string()
    .url({
      message: 'Please, provide a valid avatar URL.',
    })
    .optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type IUser = z.infer<typeof userSchema>
