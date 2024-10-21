import z from 'zod'

import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateCondominiumService } from '@/application/services/condominium/create-condominium-service'

import { condominiumSchema } from '@/application/schemas/ICondominium'

const createCondominiumSchema = condominiumSchema.omit({ id: true })

export class CreateCondominiumController implements IController {
    constructor(private createCondominiumService: CreateCondominiumService) {}

    async handle(request: IRequest): Promise<IResponse> {
        const validatedData = createCondominiumSchema.parse(request.body)
        const condominium = await this.createCondominiumService.execute(validatedData)
        return {
            statusCode: 201,
            body: null
        }
    }
}
