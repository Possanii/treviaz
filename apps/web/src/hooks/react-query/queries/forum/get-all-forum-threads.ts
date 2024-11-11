import { queryOptions } from '@tanstack/react-query'

import {
  getAllForumThreads,
  IGetAllForumThreads,
} from '@/http/forum/get-all-forum-threads'

export function useQueryGetAllForumThreads({
  condSlug,
  categorySlug,
}: {
  condSlug: string
  categorySlug?: string
}) {
  return queryOptions({
    queryKey: ['condominium', condSlug, categorySlug, 'threads'],
    queryFn: async (): Promise<IGetAllForumThreads> =>
      await getAllForumThreads({ condSlug, categorySlug }),
    refetchOnMount: false,
  })
}
