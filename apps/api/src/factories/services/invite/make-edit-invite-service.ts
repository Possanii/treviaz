import { EditInviteService } from '@/application/services/invite/edit-invite-service'

export function makeEditInviteService() {
  return new EditInviteService()
}
