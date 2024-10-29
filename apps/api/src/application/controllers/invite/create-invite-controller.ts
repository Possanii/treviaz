import { roleSchema } from '@treviaz/entities/schemas/IRole'
import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateInviteService } from '@/application/services/invite/create-invite-service'

const createInviteSchema = z.object({
  email: z.string().email(),
  slug: z.string(),
  role: roleSchema,
})

export class CreateInviteController implements IController {
  constructor(private createInviteService: CreateInviteService) {}

  async handle({ body, metadata }: IRequest): Promise<IResponse> {
    const result = createInviteSchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      throw new UnprocessableEntityError('zod', 'Invalid invite data.', errors)
    }

    const { uid } = metadata!.user!
    const { email, slug, role } = result.data
    await this.createInviteService.execute({
      email,
      role,
      condominiumSlug: slug,
      author_id: uid,
    })

    return {
      statusCode: 201,
      body: { message: 'Invite created successfully.' },
    }
  }
}
