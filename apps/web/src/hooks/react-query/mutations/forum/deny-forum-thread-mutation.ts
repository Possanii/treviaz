import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import { denyForumThread } from '@/http/forum/deny-forum-thread'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useMutationDenyForumThread() {
  return useMutation({
    mutationFn: async (params: { threadSlug: string }) =>
      await denyForumThread(params),
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
        'Tópico reprovado!',
        'O tópico foi reprovado. Uma notificação foi enviada para o criador informando o acontecido.'
      )
    },
  })
}
