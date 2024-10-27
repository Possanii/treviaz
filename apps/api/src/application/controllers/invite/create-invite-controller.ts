import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateInviteService } from '@/application/services/invite/create-invite-service'
import { Role } from '@prisma/client'
import z from 'zod'

const createInviteSchema = z.object({
  email: z.string().email(),
  condominium_id: z.string(),
  role: z.nativeEnum(Role),
})

export class CreateInviteController implements IController {
  constructor(private createInviteService: CreateInviteService) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    const result = createInviteSchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      throw new UnprocessableEntityError('zod', 'Invalid invite data.', errors)
    }

    const { email, condominium_id, role } = result.data
    await this.createInviteService.execute(email, condominium_id, role)

    return {
      statusCode: 201,
      body: { message: 'Invite created successfully.' },
    }
  }
}

