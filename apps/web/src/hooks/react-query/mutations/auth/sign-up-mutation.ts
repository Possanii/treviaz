import { useMutation } from '@tanstack/react-query'
import { createClient } from '@treviaz/supabase/client'
import { AxiosError } from 'axios'
import { env } from 'process'

import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
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
      const supabase = createClient()

      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${env.NEXT_PUBLIC_SUPABASE_AUTH_REDIRECT_URL}`,
          data: {
            name,
          },
        },
      })

      if (error) {
        ErrorToast(error.code || 'Supabase Error', error.message)
      }
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
