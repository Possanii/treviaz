import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useModalCreateDelivery } from '@/contexts/create-delivery-modal-context'
import { useMutationCreateDelivery } from '@/hooks/react-query/mutations/delivery/create-delivery-mutation'
import { useQueryGetCondominiumDeliveries } from '@/hooks/react-query/queries/delivery/get-condominium-deliveries'
import { queryClient } from '@/lib/query-client'

export const createDeliverySchema = z.object({
  condominiumSlug: z.string(),
  unitId: z.string().uuid(),
})

export type ICreateDelivery = z.infer<typeof createDeliverySchema>

export function FormCreateDeliveryController({ slug }: { slug: string }) {
  const form = useForm<ICreateDelivery>({
    resolver: zodResolver(createDeliverySchema),
    defaultValues: {
      condominiumSlug: slug,
    },
  })

  const { setOpen } = useModalCreateDelivery()

  const { mutateAsync, isPending, isSuccess } = useMutationCreateDelivery()

  useEffect(() => {
    if (isSuccess) {
      form.reset()
      queryClient.invalidateQueries(
        useQueryGetCondominiumDeliveries({ condominiumSlug: slug })
      )
      setOpen(false)
    }
  }, [isSuccess, queryClient, setOpen])

  const handleSubmit = form.handleSubmit(async (form) => {
    await mutateAsync({ ...form })
  })

  return {
    form,
    handleSubmit,
    createDeliveryIsPending: isPending,
  }
}
