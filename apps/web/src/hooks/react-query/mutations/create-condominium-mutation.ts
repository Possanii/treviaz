import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { ErrorToast, SuccessToast, UnkownErrorToats } from '@/components/toasts'
import { ICreateCondominium } from '@/forms/create-condominium/controller'
import { createCondominium } from '@/http/condominium/create-condominium'
import { HttpErroResponse } from '@/interfaces/http-error-response'

export function useCreateCondominiumMutation() {
  return useMutation({
    mutationFn: async (params: ICreateCondominium) =>
      await createCondominium(params),
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
        'Account updated',
        'Your account has been successfully updated.'
      )
    },
  })
}
