import { useMutation } from '@tanstack/react-query'
import { ILeisureArea } from '@treviaz/entities/schemas/ILeisureArea'
import { IReserve } from '@treviaz/entities/schemas/IReserve'
import { AxiosError } from 'axios'

import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import { createReserve } from '@/http/reserves/create-reserve'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useMutationCreateReserve() {
  return useMutation({
    mutationFn: async (data: {
      leisureAreaId: Pick<ILeisureArea, 'id'>
      body: Pick<IReserve, 'start_date' | 'end_date'>
    }) =>
      await createReserve({
        leisureAreaId: data.leisureAreaId.id,
        body: data.body,
      }),
    onError: async (err) => {
      if (err instanceof AxiosError) {
        const error = err.response!.data as HttpErroResponse
        ErrorToast(error.message.errorCode, error.message.message)
      } else {
        UnkownErrorToats(err)
      }
    },
    onSuccess: () => {
      SuccessToast('Reserva criado!', 'A sua reserva foi criado com sucesso.')
    },
  })
}
