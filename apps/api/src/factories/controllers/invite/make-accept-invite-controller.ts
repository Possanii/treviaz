import { AcceptInviteController } from '@/application/controllers/invite/accept-invite-controller'
import { makeAcceptInviteService } from '@/factories/services/invite/make-accept-invite-service'
import { makeGetUserByEmailService } from '@/factories/services/user/make-get-user-by-email-service'
import { makeCreateUserCondominiumService } from '@/factories/services/usercondominium/make-create-usercondominium-service'

export function makeAcceptInviteController() {
  return new AcceptInviteController(
    makeAcceptInviteService(),
    makeGetUserByEmailService(),
    makeCreateUserCondominiumService()
  )
}
