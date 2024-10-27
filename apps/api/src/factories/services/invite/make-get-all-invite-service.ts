import { GetAllInvitesService } from '@/application/services/invite/get-all-invite-service'

export function makeGetAllInviteService() {
  return new GetAllInvitesService()
}
