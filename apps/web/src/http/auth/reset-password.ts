import { ResetPasswordDto } from '@/actions/auth.dto'
import { api } from '@/lib/api-client'

export async function resetPassword(
  body: Omit<ResetPasswordDto, 'confirm_password'>
) {
  const response = await api.post('/auth/reset-password', body, {
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response
}
