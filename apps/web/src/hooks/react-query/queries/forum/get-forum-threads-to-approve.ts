import { queryOptions } from '@tanstack/react-query'

import {
  getForumThreadsToApprove,
  IGetForumThreadsToApprove,
} from '@/http/forum/get-forum-threads-to-approve'

export function useQueryGetForumThreadsToApprove({
  condominiumSlug,
}: {
  condominiumSlug: string
}) {
  return queryOptions({
    queryKey: ['condominium', condominiumSlug, 'threads', 'approve'],
    queryFn: async (): Promise<{ threads: IGetForumThreadsToApprove[] }> =>
      await getForumThreadsToApprove({ condominiumSlug }),
    refetchOnMount: false,
  })
}
