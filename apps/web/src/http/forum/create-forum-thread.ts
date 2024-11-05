import { forumCategorySchema } from '@treviaz/entities/schemas/forum/IForumCategory'
import { forumThreadSchema } from '@treviaz/entities/schemas/forum/IForumThread'
import { AxiosResponse } from 'axios'
import { z } from 'zod'

import { api } from '@/lib/api-client'

export const createForumThreadSchema = forumThreadSchema
  .pick({
    title: true,
    description: true,
    thumbnail_url: true,
  })
  .merge(
    forumCategorySchema.pick({
      name: true,
    })
  )

export type ICreateForumThread = z.infer<typeof createForumThreadSchema>

export async function createForumThread({
  name: category,
  ...body
}: ICreateForumThread): Promise<AxiosResponse> {
  const result = await api.post(`/forumthread/${category}`, body)

  return result
}
