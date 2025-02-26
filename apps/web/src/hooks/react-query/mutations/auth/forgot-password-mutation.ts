import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ForgotPasswordDto } from '@/actions/auth.dto'
import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import { forgotPassword } from '@/http/auth/forgot-password'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: async ({ email }: ForgotPasswordDto) => {
      return await forgotPassword({ email })
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
        'Email enviado!',
        'Um email foi enviado com as instruções para trocar sua senha.'
      )
    },
  })
}
