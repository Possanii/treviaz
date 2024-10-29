import { env } from 'process'

import { BadRequestError } from '@/application/errors/bad-request-error'
import { smtp } from '@/application/libs/nodemailer'
import { CreateInviteMail } from '@/application/mails/create-invite'

export class SendCreateInviteMailService {
  async execute({
    token,
    emails,
  }: {
    token: string
    emails: string[]
  }): Promise<void> {
    const mail = CreateInviteMail({
      token,
    })

    try {
      await smtp
        .sendMail({
          from: env.EMAIL_ADDRESS,
          to: emails,
          subject: mail.pt.title,
          html: mail.pt.body,
        })
        .finally(() => {
          smtp.close()
        })
    } catch {
      throw new BadRequestError(
        'email',
        'Something went wrong while sending email to create invite.'
      )
    }
  }
}
