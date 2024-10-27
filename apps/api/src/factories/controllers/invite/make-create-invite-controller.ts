import { CreateInviteController } from '@/application/controllers/invite/create-invite-controller'
import { makeCreateInviteService } from '@/factories/services/invite/make-create-invite-service'

export function makeCreateInviteController() {
  return new CreateInviteController(makeCreateInviteService())
}
