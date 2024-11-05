import { AxiosResponse } from 'axios'
import { z } from 'zod'

import { api } from '@/lib/api-client'

export const createForumCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
})

export type ICreateForumCategory = z.infer<typeof createForumCategorySchema>

export async function createForumCategory({
  slug,
  ...body
}: { slug: string } & ICreateForumCategory): Promise<AxiosResponse> {
  const result = await api.post<void>(`/forumcategory/${slug}`, body)

  return result
}
