import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import { IInviteUserCondominium } from '@/forms/invite-user-condominium/controller'
import { createInvite } from '@/http/invite/create-invite'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useCreateInviteMutation() {
  return useMutation({
    mutationFn: async (params: IInviteUserCondominium & { slug: string }) =>
      await createInvite(params),
    onError: async (err) => {
      if (err instanceof AxiosError) {
        const error = err.response!.data as HttpErroResponse
        ErrorToast(error.message.errorCode, error.message.message)
      } else {
        UnkownErrorToats(err)
      }
    },
    onSuccess: () => {
      SuccessToast('Convite enviado', 'Seu convite foi enviado com sucesso.')
    },
  })
}
