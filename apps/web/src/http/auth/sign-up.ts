import { api } from '@/lib/api-client'
import { ISignUp } from '@/schemas/ISign-up'

export async function signUp(body: Omit<ISignUp, 'password_confirmation'>) {
  const response = await api.post('/auth/sign-up', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response
}
