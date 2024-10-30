import { GetInviteByTokenService } from '@/application/services/invite/get-invite-by-token-service'

export function makeGetInviteByTokenService() {
  return new GetInviteByTokenService()
}
