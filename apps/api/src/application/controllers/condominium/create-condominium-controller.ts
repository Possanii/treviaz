import z from 'zod'

import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { addressSchema } from '@/application/schemas/IAddress'
import { condominiumSchema } from '@/application/schemas/ICondominium'
import { CreateCondominiumService } from '@/application/services/condominium/create-condominium-service'

const createCondominiumSchema = condominiumSchema
  .pick({
    name: true,
    owner_id: true,
    photo_url: true,
  })
  .merge(
    z.object({
      address: addressSchema.omit({ id: true }),
    })
  )

export class CreateCondominiumController implements IController {
  constructor(private createCondominiumService: CreateCondominiumService) {}

  async handle({ body, metadata }: IRequest): Promise<IResponse> {
    const result = createCondominiumSchema.safeParse({
      ...body,
      owner_id: metadata?.user?.uid,
    })

    if (!result.success) {
      const errors = result.error.flatten().fieldErrors

      throw new UnprocessableEntityError(
        'zod',
        'Invalid condominium data.',
        errors
      )
    }

    await this.createCondominiumService.execute(result.data)

    return {
      statusCode: 204,
      body: null,
    }
  }
}
