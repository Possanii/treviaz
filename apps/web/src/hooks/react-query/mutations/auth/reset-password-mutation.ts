import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ResetPasswordDto } from '@/actions/auth.dto'
import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import { resetPassword } from '@/http/auth/reset-password'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useResetPasswordMutation() {
  return useMutation({
    mutationFn: async ({
      password,
    }: Omit<ResetPasswordDto, 'confirm_password'>) => {
      return await resetPassword({ password })
    },
    onError: async (err) => {
      if (err instanceof AxiosError) {
        const error = err.response!.data as HttpErroResponse
        ErrorToast(error.message.errorCode, error.message.message)
      } else {
        UnkownErrorToats(err)
      }
    },
    onSuccess: () => {
      SuccessToast(
        'Senha alterada!',
        'Sua senha foi alterada. Agora é possivel fazer login com a nova senha.'
      )
    },
  })
}
