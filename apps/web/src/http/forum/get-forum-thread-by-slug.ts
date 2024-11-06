import { forumPostSchema } from '@treviaz/entities/schemas/forum/IForumPost'
import { forumThreadSchema } from '@treviaz/entities/schemas/forum/IForumThread'
import { userSchema } from '@treviaz/entities/schemas/IUser'
import { z } from 'zod'

import { api } from '@/lib/api-client'

export const getForumThreadBySlugSchema = forumThreadSchema.extend({
  created_by: userSchema.pick({
    id: true,
    name: true,
    avatar_url: true,
  }),
  posts: z.array(
    forumPostSchema.extend({
      user: userSchema.pick({
        id: true,
        name: true,
        avatar_url: true,
      }),
    })
  ),
})

export type IGetForumThreadBySlug = z.infer<typeof getForumThreadBySlugSchema>

export async function getForumThreadBySlug({
  threadSlug,
}: {
  threadSlug: string
}): Promise<{ thread: IGetForumThreadBySlug }> {
  const result = await api.get<{
    body: { thread: IGetForumThreadBySlug }
  }>(`/thread/${threadSlug}`)

  return { ...result.data.body }
}
