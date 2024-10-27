import { DenyInviteService } from '@/application/services/invite/deny-invite-service'

export function makeDenyInviteService() {
  return new DenyInviteService()
}
