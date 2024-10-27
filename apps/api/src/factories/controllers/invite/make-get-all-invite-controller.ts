import { GetAllInviteController } from '@/application/controllers/invite/get-all-invite-controller'
import { makeGetAllInviteService } from '@/factories/services/invite/make-get-all-invite-service'

export function makeGetAllInviteController() {
  return new GetAllInviteController(makeGetAllInviteService())
}
