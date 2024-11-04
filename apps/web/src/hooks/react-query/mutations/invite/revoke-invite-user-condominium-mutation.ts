import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import { revokeInviteUserCondominium } from '@/http/invite/revoke-invite-user-condominiu'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useMutationRevokeInviteUserCondominium() {
  return useMutation({
    mutationFn: async ({ inviteId }: { inviteId: string }) =>
      await revokeInviteUserCondominium({ inviteId }),
    onError: async (err) => {
      if (err instanceof AxiosError) {
        const error = err.response!.data as HttpErroResponse
        ErrorToast(error.message.errorCode, error.message.message)
      } else {
        UnkownErrorToats(err)
      }
    },
    onSuccess: () => {
      SuccessToast('Convite inválidado', 'O convite não é mais válido.')
    },
  })
}
