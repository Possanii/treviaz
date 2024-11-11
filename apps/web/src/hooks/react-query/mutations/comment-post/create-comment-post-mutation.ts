import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import { createCommentPost } from '@/http/comment-post/create-comment-post'
import { HttpErroResponse } from '@/interfaces/http-error-response'
import { ICreateCommentPostProps } from '@/schemas/create-comment-post-schema'

export function useMutationCreateCommentPost() {
  return useMutation({
    mutationFn: async (props: ICreateCommentPostProps) =>
      await createCommentPost(props),
    onError: (err) => {
      if (err instanceof AxiosError) {
        const error = err.response!.data as HttpErroResponse

        ErrorToast(error.message.errorCode, error.message.message)
      } else {
        UnkownErrorToats(err)
      }
    },
    onSuccess: () => {
      SuccessToast(
        'Comentário criado!',
        'Seu comentário já está postado! Outros usuários já podem interagir.'
      )
    },
  })
}
