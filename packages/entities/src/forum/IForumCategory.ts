import z from 'zod'

export const forumCategorySchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slug: z.string(),
  description: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
})

export type IForumCategory = z.infer<typeof forumCategorySchema>
