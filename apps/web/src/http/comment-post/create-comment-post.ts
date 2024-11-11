import { AxiosResponse } from 'axios'

import { api } from '@/lib/api-client'
import { ICreateCommentPostProps } from '@/schemas/create-comment-post-schema'

export async function createCommentPost({
  condSlug,
  threadSlug,
  ...body
}: ICreateCommentPostProps): Promise<AxiosResponse> {
  const result = await api.post(`/forumpost/${condSlug}/${threadSlug}`, body)

  return result
}
