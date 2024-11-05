import { queryOptions } from '@tanstack/react-query'

import {
  getAllForumThreads,
  IGetAllForumThreads,
} from '@/http/forum/get-all-forum-threads'

export function useQueryGetAllForumThreads({ slug }: { slug?: string }) {
  return queryOptions({
    queryKey: ['condominium', slug, 'threads'],
    queryFn: async (): Promise<IGetAllForumThreads> =>
      await getAllForumThreads({ slug }),
    refetchOnMount: false,
  })
}
