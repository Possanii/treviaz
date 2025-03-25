import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useModalCreateDelivery } from '@/contexts/create-delivery-modal-context'
import { useMutationCreateDelivery } from '@/hooks/react-query/mutations/delivery/create-delivery-mutation'
import { useQueryGetCondominiumDeliveries } from '@/hooks/react-query/queries/delivery/get-condominium-deliveries'
import { queryClient } from '@/lib/query-client'

export const createDeliverySchema = z.object({
  condominium_id: z.string().uuid(),
  unitId: z.string().uuid(),
})

export type ICreateDelivery = z.infer<typeof createDeliverySchema>

export function FormCreateDeliveryController({ slug }: { slug: string }) {
  const form = useForm<ICreateDelivery>({
    resolver: zodResolver(createDeliverySchema),
    defaultValues: {
      condominium_id: '18d00dc9-bd71-40b0-835f-d5091700c0bd',
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
