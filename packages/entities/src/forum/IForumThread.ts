import z from 'zod'

const forumThreadStatusSchema = z.enum(['APPROVED', 'DENIED', 'PENDING'])

export const forumThreadSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  slug: z.string(),
  status: forumThreadStatusSchema,
  created_at: z.date(),
  updated_at: z.date(),
})

export type IForumThread = z.infer<typeof forumThreadSchema>
