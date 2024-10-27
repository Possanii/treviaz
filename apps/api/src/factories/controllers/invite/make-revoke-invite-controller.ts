import { RevokeInviteController } from '@/application/controllers/invite/revoke-invite-controller'
import { makeRevokeInviteService } from '@/factories/services/invite/make-revoke-invite-service'

export function makeRevokeInviteController() {
  return new RevokeInviteController(makeRevokeInviteService())
}
