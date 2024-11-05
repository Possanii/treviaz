import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import {
  createForumThread,
  ICreateForumThread,
} from '@/http/forum/create-forum-thread'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useMutationCreateForumThread() {
  return useMutation({
    mutationFn: async (params: ICreateForumThread) =>
      await createForumThread(params),
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
        'Tópico criado!',
        'O tópico foi submetido a aprovação de um administrador.'
      )
    },
  })
}
