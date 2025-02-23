import { AxiosResponse } from 'axios'

import { SignInDto } from '@/actions/auth'
import { api } from '@/lib/api-client'

export async function signIn(body: SignInDto): Promise<AxiosResponse> {
  const result = await api.post('/auth/signin', body)

  return result
}
