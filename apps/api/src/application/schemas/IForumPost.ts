import z from 'zod'

export const forumPostSchema = z.object({
  id: z.string().uuid(),
  content: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
  thread_id: z.string().uuid(),
  user_id: z.string().uuid(),
})

export type IForumPost = z.infer<typeof forumPostSchema>
