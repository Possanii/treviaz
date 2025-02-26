import { useMutation } from '@tanstack/react-query'
import { cookiesStorage } from '@treviaz/cookies'
import { env } from '@treviaz/env'
import { AxiosError, AxiosResponse } from 'axios'
import { setCookie } from 'cookies-next'

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
    onSuccess: (response: AxiosResponse) => {
      setCookie(
        cookiesStorage.API_AUTH_TOKEN,
        response.data.body.access_token,
        {
          httpOnly: true,
          expires: new Date(Date.now() + response.data.body.expires_in * 1000),
          path: '/',
          sameSite: 'strict',
          secure: env.NEXT_PUBLIC_NODE_ENV === 'production',
        }
      )
      SuccessToast('Login realizado!', 'Logado com sucesso.')
    },
  })
}
