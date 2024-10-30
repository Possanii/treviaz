import { zodResolver } from '@hookform/resolvers/zod'
import { addressSchema } from '@treviaz/entities/schemas/IAddress'
import { condominiumSchema } from '@treviaz/entities/schemas/ICondominium'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useModalCreateCondominium } from '@/contexts/create-condominium-modal-context'
import { useCreateCondominiumMutation } from '@/hooks/react-query/mutations/create-condominium-mutation'
import { useQueryGetRelationshipsWithCondominiums } from '@/hooks/react-query/queries/get-user-relationships-with-condominiums'
import { queryClient } from '@/lib/query-client'

export const createCondominiumSchema = condominiumSchema
  .pick({
    name: true,
    photo_url: true,
  })
  .merge(
    z.object({
      address: addressSchema.omit({ id: true }),
    })
  )

export type ICreateCondominium = z.infer<typeof createCondominiumSchema>

export function FormCreateCondominiumController() {
  const form = useForm<ICreateCondominium>({
    resolver: zodResolver(createCondominiumSchema),
    defaultValues: {
      name: '',
      photo_url: null,
      address: {
        city: '',
        complement: undefined,
        country: '',
        neighborhood: '',
        number: '',
        state: '',
        street: '',
        zip_code: '',
      },
    },
  })

  const { setOpen } = useModalCreateCondominium()

  const { mutateAsync, isPending, isSuccess } = useCreateCondominiumMutation()

  useEffect(() => {
    if (isSuccess) {
      form.reset()
      queryClient.invalidateQueries(useQueryGetRelationshipsWithCondominiums())
      setOpen(false)
    }
  }, [isSuccess, queryClient, setOpen])

  const handleSubmit = form.handleSubmit(async (form) => {
    await mutateAsync(form)
  })

  return {
    form,
    handleSubmit,
    createCondominiumIsPending: isPending,
  }
}
