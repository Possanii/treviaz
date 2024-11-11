import { IForumThread } from '@treviaz/entities/schemas/forum/IForumThread'
import { IUser } from '@treviaz/entities/schemas/IUser'

import { api } from '@/lib/api-client'

export interface IGetAllForumThreads {
  threads: (IForumThread & {
    created_by: Pick<IUser, 'id' | 'name' | 'avatar_url'>
  })[]
}

export async function getAllForumThreads({
  slug = 'all',
}: {
  slug?: string
}): Promise<IGetAllForumThreads> {
  const result = await api.get<{ body: IGetAllForumThreads }>(
    `/forumthread/${slug}`
  )

  return { ...result.data.body }
}
