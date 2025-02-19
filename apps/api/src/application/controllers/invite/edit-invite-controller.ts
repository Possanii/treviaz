import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { EditInviteService } from '@/application/services/invite/edit-invite-service'
import { Role } from '@prisma/client'
import z from 'zod'

const editInviteSchema = z.object({
  id: z.string(),
  status: z.enum(['PENDING', 'ACCEPTED', 'DENIED', 'REVOKED']),
  expires_at: z.string().optional(),
  condominium_id: z.string().optional(),
  role: z.nativeEnum(Role).optional(),
})

export class EditInviteController implements IController {
  constructor(private editInviteService: EditInviteService) {}

  async handle({ body }: IRequest): Promise<IResponse> {
    const result = editInviteSchema.safeParse(body)

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      throw new UnprocessableEntityError(
        'zod',
        'Invalid invite edit data.',
        errors
      )
    }

    const { id, status, expires_at, condominium_id, role } = result.data
    const invite = await this.editInviteService.execute(id, {
      status,
      expires_at: expires_at ? new Date(expires_at) : undefined, // Convert string to Date
      condominium_id,
      role,
    })

    return {
      statusCode: 200,
      body: invite,
    }
  }
}
