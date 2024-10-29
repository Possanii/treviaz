import { CreateInviteController } from '@/application/controllers/invite/create-invite-controller'
import { makeCreateInviteService } from '@/factories/services/invite/make-create-invite-service'
import { makeSendCreateInviteMailService } from '@/factories/services/mail/make-send-create-invite-mail-service'

export function makeCreateInviteController() {
  return new CreateInviteController(
    makeCreateInviteService(),
    makeSendCreateInviteMailService()
  )
}
