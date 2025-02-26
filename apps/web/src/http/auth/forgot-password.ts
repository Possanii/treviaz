import { ForgotPasswordDto } from '@/actions/auth.dto'
import { api } from '@/lib/api-client'

export async function forgotPassword(body: ForgotPasswordDto) {
  const response = await api.post('/auth/forgot-password', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response
}
