import { queryOptions } from '@tanstack/react-query'

import {
  getForumThreadBySlug,
  IGetForumThreadBySlug,
} from '@/http/forum/get-forum-thread-by-slug'

export function useQueryGetForumThreadBySlug({
  condominiumSlug,
  threadSlug,
}: {
  condominiumSlug: string
  threadSlug: string
}) {
  return queryOptions({
    queryKey: ['condominium', condominiumSlug, 'thread', threadSlug],
    queryFn: async (): Promise<{ thread: IGetForumThreadBySlug }> =>
      await getForumThreadBySlug({ threadSlug }),
    refetchOnMount: false,
  })
}
