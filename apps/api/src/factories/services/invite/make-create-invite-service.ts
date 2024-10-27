import { CreateInviteService } from '@/application/services/invite/create-invite-service'

export function makeCreateInviteService() {
  return new CreateInviteService()
}
