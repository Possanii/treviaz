import { useMutation } from '@tanstack/react-query'
import { ILeisureArea } from '@treviaz/entities/schemas/ILeisureArea'
import { AxiosError } from 'axios'

import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import { createLeisureArea } from '@/http/leisure-area/create-leisure-area'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useMutationCreateLeisureArea({ slug }: { slug: string }) {
  return useMutation({
    mutationFn: async (
      body: Pick<ILeisureArea, 'name' | 'description' | 'photo_url'>
    ) => await createLeisureArea({ slug, body }),
    onError: async (err) => {
      if (err instanceof AxiosError) {
        const error = err.response!.data as HttpErroResponse
        ErrorToast(error.message.errorCode, error.message.message)
      } else {
        UnkownErrorToats(err)
      }
    },
    onSuccess: () => {
      SuccessToast('Área comum criado!', 'A área comum foi criado com sucesso.')
    },
  })
}
