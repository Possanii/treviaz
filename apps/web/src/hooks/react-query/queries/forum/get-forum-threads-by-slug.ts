import { queryOptions } from '@tanstack/react-query'

import {
  getForumThreadBySlug,
  IGetForumThreadBySlug,
} from '@/http/forum/get-forum-thread-by-slug'

export function useQueryGetForumThreadBySlug({
  condSlug,
  threadSlug,
}: {
  condSlug: string
  threadSlug: string
}) {
  return queryOptions({
    queryKey: ['condominium', condSlug, 'thread', threadSlug],
    queryFn: async (): Promise<{ thread: IGetForumThreadBySlug }> =>
      await getForumThreadBySlug({ condSlug, threadSlug }),
    refetchOnMount: false,
  })
}
