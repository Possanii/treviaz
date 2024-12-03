import { ICondominium } from '@treviaz/entities/schemas/ICondominium'
import { IUser } from '@treviaz/entities/schemas/IUser'
import { IUserCondominium } from '@treviaz/entities/schemas/IUserCondominium'

import { api } from '@/lib/api-client'

export interface IGetUserById {
  user: IUser & {
    created_at: Date
    condominiums: (Pick<IUserCondominium, 'id' | 'role' | 'joined_at'> & {
      condominium: Pick<ICondominium, 'id' | 'name' | 'slug' | 'photo_url'>
    })[]
  }
}

export async function getUserById({
  slug,
  id,
}: {
  slug: string
  id: string
}): Promise<IGetUserById> {
  const result = await api.get<{ body: IGetUserById }>(`/user/${slug}/${id}`)

  return result.data.body
}
