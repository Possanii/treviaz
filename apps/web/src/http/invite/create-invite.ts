import { AxiosResponse } from 'axios'

import { IInviteUserCondominium } from '@/forms/invite-user-condominium/controller'
import { api } from '@/lib/api-client'

export async function createInvite(
  body: IInviteUserCondominium & { slug: string }
): Promise<AxiosResponse> {
  const result = await api.post<void>('/invite', body)

  return result
}
