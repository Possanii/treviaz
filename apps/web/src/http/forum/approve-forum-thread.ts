import { AxiosResponse } from 'axios'

import { api } from '@/lib/api-client'

export async function approveForumThread({
  threadSlug,
}: {
  threadSlug: string
}): Promise<AxiosResponse> {
  const result = await api.put(`/forumthread/${threadSlug}/approve`)

  return result
}
