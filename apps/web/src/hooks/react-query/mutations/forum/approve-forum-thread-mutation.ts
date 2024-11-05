import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import { approveForumThread } from '@/http/forum/approve-forum-thread'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useMutationApproveForumThread() {
  return useMutation({
    mutationFn: async (params: { threadSlug: string }) =>
      await approveForumThread(params),
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
        'Tópico approvado!',
        'O tópico está no ar! As pessoas já podem visualizar e interagir com ele.'
      )
    },
  })
}
