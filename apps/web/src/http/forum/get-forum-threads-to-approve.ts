import { forumThreadSchema } from '@treviaz/entities/schemas/forum/IForumThread'
import { userSchema } from '@treviaz/entities/schemas/IUser'
import { z } from 'zod'

import { api } from '@/lib/api-client'
import { formatStringToDate } from '@/utils/format-string-to-date'

export const getForumThreadsToApproveSchema = forumThreadSchema.extend({
  created_by: userSchema.pick({
    id: true,
    name: true,
    avatar_url: true,
  }),
})

export type IGetForumThreadsToApprove = z.infer<
  typeof getForumThreadsToApproveSchema
>

export async function getForumThreadsToApprove({
  condominiumSlug,
}: {
  condominiumSlug: string
}): Promise<{ threads: IGetForumThreadsToApprove[] }> {
  const result = await api.get<{
    body: { threads: IGetForumThreadsToApprove[] }
  }>(`/forumthread/${condominiumSlug}/approve`)

  const formatedThreads = formatStringToDate({
    data: result.data.body.threads,
    fields: ['created_at', 'updated_at'],
  })

  return { threads: formatedThreads }
}
