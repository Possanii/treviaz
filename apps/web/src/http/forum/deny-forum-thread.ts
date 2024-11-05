import { AxiosResponse } from 'axios'

import { api } from '@/lib/api-client'

export async function denyForumThread({
  threadSlug,
}: {
  threadSlug: string
}): Promise<AxiosResponse> {
  const result = await api.put(`/forumthread/${threadSlug}/deny`)

  return result
}
