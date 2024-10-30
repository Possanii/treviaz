import { GetInviteByTokenController } from '@/application/controllers/invite/get-invite-by-token'
import { makeGetInviteByTokenService } from '@/factories/services/invite/make-get-invite-by-token-service'

export function makeGetInviteByTokenController() {
  return new GetInviteByTokenController(makeGetInviteByTokenService())
}
