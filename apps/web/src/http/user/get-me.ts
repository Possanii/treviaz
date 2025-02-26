import { IUser } from '@treviaz/entities/schemas/IUser'

import { api } from '@/lib/api-client'

export async function getMe(): Promise<IUser> {
  const result = await api.get<{ body: { user: IUser } }>(`/user`)

  return result.data.body.user
}
