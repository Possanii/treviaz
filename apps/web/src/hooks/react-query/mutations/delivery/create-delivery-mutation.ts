import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import {
  createDelivery,
  ICreateDeliveryDTO,
} from '@/http/delivery/create-delivey'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useMutationCreateDelivery() {
  return useMutation({
    mutationFn: async (params: ICreateDeliveryDTO) =>
      await createDelivery(params),
    onError: async (err) => {
      if (err instanceof AxiosError) {
        const error = err.response!.data as HttpErroResponse
        ErrorToast(error.message.errorCode, error.message.message)
      } else {
        UnkownErrorToats(err)
      }
    },
    onSuccess: () => {
      SuccessToast('Entrega criada!')
    },
  })
}
