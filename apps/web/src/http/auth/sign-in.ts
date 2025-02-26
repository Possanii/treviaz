import { SignInDto } from '@/actions/auth.dto'
import { api } from '@/lib/api-client'

export async function signIn(body: SignInDto) {
  const response = await api.post('/auth/sign-in', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response
}
