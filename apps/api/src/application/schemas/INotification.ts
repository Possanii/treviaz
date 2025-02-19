import z from 'zod'

export const notificationSchema = z.object({
  id: z.string().uuid(),
  user_id: z.string().uuid(),
  title: z.string(),
  message: z.string(),
  created_at: z.date(),
  viewed: z.boolean(),
  type: z.string(),
  data: z.any(),
})

export type INotification = z.infer<typeof notificationSchema>
