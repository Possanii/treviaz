import { zodResolver } from '@hookform/resolvers/zod'
import { inviteSchema } from '@treviaz/entities/schemas/IInvite'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useModalInviteUserCondominium } from '@/contexts/invite-user-condominio-modal-context'
import { useCreateInviteMutation } from '@/hooks/react-query/mutations/invite/create-invite-mutation'
import { useQueryGetAllInvitesBySlugCondominium } from '@/hooks/react-query/queries/invites/get-all-invites-by-slug-condominium'
import { queryClient } from '@/lib/query-client'

export const inviteUserCondominiumSchema = inviteSchema.pick({
  email: true,
  role: true,
})

export type IInviteUserCondominium = z.infer<typeof inviteUserCondominiumSchema>

export function FormInviteUserCondominiumController({
  slug,
}: {
  slug: string
}) {
  const form = useForm<IInviteUserCondominium>({
    resolver: zodResolver(inviteUserCondominiumSchema),
    defaultValues: {
      email: '',
      role: 'RESIDENT',
    },
  })

  const { setOpen } = useModalInviteUserCondominium()

  const { mutateAsync, isPending, isSuccess } = useCreateInviteMutation()

  useEffect(() => {
    if (isSuccess) {
      form.reset()
      queryClient.invalidateQueries(
        useQueryGetAllInvitesBySlugCondominium({ slug })
      )
      setOpen(false)
    }
  }, [isSuccess, queryClient, setOpen])

  const handleSubmit = form.handleSubmit(async (form) => {
    await mutateAsync({ ...form, slug })
  })

  return {
    form,
    handleSubmit,
    inviteUserCondominiumIsPending: isPending,
  }
}
