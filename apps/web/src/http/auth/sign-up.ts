import { AxiosResponse } from 'axios'

import { api } from '@/lib/api-client'
import { SignUpDto } from '@/schemas/ISign-up'

export async function signUp(
  body: Omit<SignUpDto, 'password_confirmation'>
): Promise<AxiosResponse> {
  const result = await api.post('/auth/signup', body)

  return result
}
