import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import { signUp } from '@/http/auth/sign-up'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useSignUpMutation() {
  return useMutation({
    mutationFn: async ({
      email,
      password,
      name,
    }: {
      email: string
      password: string
      name: string
    }) => {
      return await signUp({
        name,
        email,
        password,
      })
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
      SuccessToast('Usuário criado', 'Seu usuário foi criado com sucesso.')
    },
  })
}
