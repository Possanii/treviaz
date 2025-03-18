import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import { updateDeliveryStatus } from '@/http/delivery/approve-delivery'
import { IDeliveryStatus } from '@/http/delivery/get-condominium-deliveries'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useMutationUpdateDelivery() {
  return useMutation({
    mutationFn: async (params: {
      deliveryId: string
      status: IDeliveryStatus
    }) => await updateDeliveryStatus(params),
    onError: async (err) => {
      if (err instanceof AxiosError) {
        const error = err.response!.data as HttpErroResponse
        ErrorToast(error.message.errorCode, error.message.message)
      } else {
        UnkownErrorToats(err)
      }
    },
    onSuccess: () => {
      SuccessToast('Entrega atualizado!')
    },
  })
}
