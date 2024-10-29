import { SendCreateInviteMailService } from '@/application/services/mail/send-create-invite-mail-service'

export function makeSendCreateInviteMailService() {
  return new SendCreateInviteMailService()
}
