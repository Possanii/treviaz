import { AcceptInviteService } from '@/application/services/invite/accept-invite-service'

export function makeAcceptInviteService() {
  return new AcceptInviteService()
}
