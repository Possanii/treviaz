import { z } from 'zod'

export const createCommentPostSchema = z.object({
  condSlug: z.string().min(1),
  threadSlug: z.string().min(1),
  content: z.string().min(1),
})

export type ICreateCommentPostProps = z.infer<typeof createCommentPostSchema>
