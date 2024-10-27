import { AcceptInviteController } from '@/application/controllers/invite/accept-invite-controller'
import { makeAcceptInviteService } from '@/factories/services/invite/make-accept-invite-service'

export function makeAcceptInviteController() {
  return new AcceptInviteController(makeAcceptInviteService())
}
