import { DeleteInviteController } from '@/application/controllers/invite/delete-invite-controller'
import { makeDeleteInviteService } from '@/factories/services/invite/make-delete-invite-service'

export function makeDeleteInviteController() {
  return new DeleteInviteController(makeDeleteInviteService())
}
