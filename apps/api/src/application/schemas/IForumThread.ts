import z from 'zod'

export const forumThreadSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  status: z.enum(['APPROVED', 'DENIED', 'PENDING']),
  created_at: z.date(),
  updated_at: z.date(),
  category_id: z.string().uuid(),
  user_id: z.string().uuid(),
})

export type IForumThread = z.infer<typeof forumThreadSchema>
