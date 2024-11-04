import { ModalFooter } from '@treviaz/ui/components/custom/modal/modal-footer'
import { Button } from '@treviaz/ui/components/ui/button'
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@treviaz/ui/components/ui/card'

import { getCurrentCondominium } from '@/utils/utils'

import { FormRevokeInviteUserCondominiumController } from './controller'

export function RevokeInviteUserCondominiumForm({
  inviteId,
}: {
  inviteId: string
}) {
  const slug = getCurrentCondominium()

  const { handleSubmit, revokeInviteUserCondominiumIsPending } =
    FormRevokeInviteUserCondominiumController({ slug: slug as string })

  return (
    <>
      <CardHeader>
        <CardTitle>Revogar Convite</CardTitle>
        <CardDescription>
          Ao confirmar, o convite de participação do usuário não será mais
          válido. Você deverá enviar um novo convite.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ModalFooter
          className="mt-6"
          isLoading={revokeInviteUserCondominiumIsPending}
          action={
            <Button
              onClick={() => handleSubmit({ inviteId })}
              variant={'destructive'}
            >
              Revogar
            </Button>
          }
        />
      </CardContent>
    </>
  )
}
