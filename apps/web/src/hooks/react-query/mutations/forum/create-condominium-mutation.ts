import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import {
  createForumCategory,
  ICreateForumCategory,
} from '@/http/forum/create-forum-category'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useMutationCreateForumCategory() {
  return useMutation({
    mutationFn: async (params: { slug: string } & ICreateForumCategory) =>
      await createForumCategory(params),
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
        'Categoria criado!',
        'Uma nova categoria no forum foi criada com sucesso.'
      )
    },
  })
}
