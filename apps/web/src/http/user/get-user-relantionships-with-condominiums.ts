import { ICondominium } from '@treviaz/entities/schemas/ICondominium'
import { IUserCondominium } from '@treviaz/entities/schemas/IUserCondominium'

import { api } from '@/lib/api-client'

export interface IGetUserRelationshipsWithCondominiums
  extends Pick<IUserCondominium, 'id' | 'role' | 'joined_at'> {
  condominium: Pick<ICondominium, 'id' | 'name' | 'slug'>
}

export async function getAllUsersRelantioshipsWithCondominiums() {
  const result = await api.get<{
    body: { relantionships: IGetUserRelationshipsWithCondominiums[] }
  }>('/user/condominiums/relationship')

  return { ...result.data.body }
}
