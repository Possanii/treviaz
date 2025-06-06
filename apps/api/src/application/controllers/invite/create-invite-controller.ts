import { roleEnum } from '@treviaz/entities/schemas/IRole'
import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateInviteService } from '@/application/services/invite/create-invite-service'
import { SendCreateInviteMailService } from '@/application/services/mail/send-create-invite-mail-service'

const createInviteSchema = z.object({
  email: z.string().email(),
  slug: z.string(),
  role: roleEnum,
})

export class CreateInviteController implements IController {
  constructor(
    private createInviteService: CreateInviteService,
    private sendCreateInviteMailService: SendCreateInviteMailService
  ) {}

  async handle({ body, metadata }: IRequest): Promise<IResponse> {
    const result = createInviteSchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      throw new UnprocessableEntityError('zod', 'Invalid invite data.', errors)
    }

    const { id } = metadata!.user!
    const { email, slug, role } = result.data

    const { token } = await this.createInviteService.execute({
      email,
      role,
      condominiumSlug: slug,
      author_id: id,
    })

    this.sendCreateInviteMailService.execute({ token, emails: [email] })

    return {
      statusCode: 201,
      body: { message: 'Invite created successfully.' },
    }
  }
}
