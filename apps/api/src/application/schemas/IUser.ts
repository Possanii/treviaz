import z from 'zod'

export const userSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  name: z.string().nullable(),
})

export type IUser = z.infer<typeof userSchema>
