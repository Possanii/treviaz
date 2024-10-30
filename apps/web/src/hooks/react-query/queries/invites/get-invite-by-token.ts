import { queryOptions } from '@tanstack/react-query'

import {
  getInviteByToken,
  IGetInviteByTokenResponse,
} from '@/http/invite/get-invite-by-token'

export function useQueryGetInviteByToken({ token }: { token: string }) {
  return queryOptions({
    queryKey: ['invite', token],
    queryFn: async (): Promise<IGetInviteByTokenResponse> =>
      await getInviteByToken({ token }),
    refetchOnMount: false,
  })
}
