import { AxiosResponse } from 'axios'

import { api } from '@/lib/api-client'

export async function revokeInviteUserCondominium({
  inviteId,
}: {
  inviteId: string
}): Promise<AxiosResponse> {
  const result = await api.put<void>(`/invite/${inviteId}/revoke`)

  return result
}
