import { AxiosResponse } from 'axios'

import { ICreateCondominium } from '@/forms/create-condominium/controller'
import { api } from '@/lib/api-client'

export async function createCondominium(
  body: ICreateCondominium
): Promise<AxiosResponse> {
  const result = await api.post('/condominium', body)

  return result
}
