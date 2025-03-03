import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'

import { SignInDto } from '@/actions/auth.dto'
import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import { signIn } from '@/http/auth/sign-in'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useSignInMutation() {
  return useMutation({
    mutationFn: async ({ email, password }: SignInDto) => {
      return await signIn({ email, password })
    },
    onError: async (err) => {
      if (err instanceof AxiosError) {
        const error = err.response!.data as HttpErroResponse
        ErrorToast(error.message.errorCode, error.message.message)
      } else {
        UnkownErrorToats(err)
      }
    },
    onSuccess: async (response: AxiosResponse) => {
      await fetch('/api/set-cookie', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(response.data),
      })

      SuccessToast('Login realizado!', 'Logado com sucesso.')
    },
  })
}
