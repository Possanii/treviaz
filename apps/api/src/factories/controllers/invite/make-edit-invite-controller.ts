import { EditInviteController } from '@/application/controllers/invite/edit-invite-controller'
import { makeEditInviteService } from '@/factories/services/invite/make-edit-invite-service'

export function makeEditInviteController() {
  return new EditInviteController(makeEditInviteService())
}
