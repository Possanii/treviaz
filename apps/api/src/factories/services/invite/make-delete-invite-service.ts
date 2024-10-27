import { DeleteInviteService } from '@/application/services/invite/delete-invite-service'

export function makeDeleteInviteService() {
  return new DeleteInviteService()
}
