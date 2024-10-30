import { ICondominium } from '@treviaz/entities/schemas/ICondominium'
import { IInvite } from '@treviaz/entities/schemas/IInvite'
import { IUser } from '@treviaz/entities/schemas/IUser'

import { api } from '@/lib/api-client'

export interface IGetInviteByTokenResponse {
  invite: Pick<IInvite, 'id' | 'email' | 'role' | 'sent_at' | 'expires_at'> & {
    author: Pick<IUser, 'id' | 'name' | 'avatar_url'>
  } & {
    condominium: Pick<ICondominium, 'id' | 'name' | 'photo_url'>
  }
}

export async function getInviteByToken({
  token,
}: {
  token: string
}): Promise<IGetInviteByTokenResponse> {
  const result = await api.get<{
    body: IGetInviteByTokenResponse
  }>(`/invite/${token}`)

  return { ...result.data.body }
}
