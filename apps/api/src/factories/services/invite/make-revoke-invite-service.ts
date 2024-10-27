import { RevokeInviteService } from '@/application/services/invite/revoke-invite-service'

export function makeRevokeInviteService() {
  return new RevokeInviteService()
}
