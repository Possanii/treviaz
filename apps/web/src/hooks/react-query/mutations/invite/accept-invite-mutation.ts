import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import { acceptInvite } from '@/http/invite/accept-invite'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useAcceptInviteMutation() {
  return useMutation({
    mutationFn: async (params: { token: string }) => await acceptInvite(params),
    onError: async (err) => {
      if (err instanceof AxiosError) {
        const error = err.response!.data as HttpErroResponse
        ErrorToast(error.message.errorCode, error.message.message)
      } else {
        UnkownErrorToats(err)
      }
    },
    onSuccess: () => {
      SuccessToast('Convite aceito', 'Seu convite foi aceito com sucesso.')
    },
  })
}
