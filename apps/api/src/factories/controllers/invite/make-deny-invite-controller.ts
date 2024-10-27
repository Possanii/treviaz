import { DenyInviteController } from '@/application/controllers/invite/deny-invite-controller'
import { makeDenyInviteService } from '@/factories/services/invite/make-deny-invite-service'

export function makeDenyInviteController() {
  return new DenyInviteController(makeDenyInviteService())
}
