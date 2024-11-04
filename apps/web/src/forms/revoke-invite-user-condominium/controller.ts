import { useEffect } from 'react'

import { useModalRevokeInviteUserCondominium } from '@/contexts/revoke-invite-user-condominio-modal-context'
import { useMutationRevokeInviteUserCondominium } from '@/hooks/react-query/mutations/invite/revoke-invite-user-condominium-mutation'
import { useQueryGetAllInvitesBySlugCondominium } from '@/hooks/react-query/queries/invites/get-all-invites-by-slug-condominium'
import { queryClient } from '@/lib/query-client'

export function FormRevokeInviteUserCondominiumController({
  slug,
}: {
  slug: string
}) {
  const { setOpen } = useModalRevokeInviteUserCondominium()

  const { mutateAsync, isPending, isSuccess } =
    useMutationRevokeInviteUserCondominium()

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries(
        useQueryGetAllInvitesBySlugCondominium({ slug })
      )
      setOpen(false)
    }
  }, [isSuccess, queryClient, setOpen])

  return {
    handleSubmit: mutateAsync,
    revokeInviteUserCondominiumIsPending: isPending,
  }
}
