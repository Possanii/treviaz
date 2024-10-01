import z from 'zod'

import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { CreateServiceOwnerService } from '@/application/services/auth/serviceowner/create-serviceowner-service'
import { serviceOwnerSchema } from '@/application/schemas/IServiceOwner'

const createServiceOwnerSchema = serviceOwnerSchema.omit({ id: true }).extend({
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' })  
})

export class CreateServiceOwnerController implements IController {
    constructor(private createServiceOwnerService: CreateServiceOwnerService) { }

    async handle(request: IRequest): Promise<IResponse> {
        const validatedData = createServiceOwnerSchema.parse(request.body)
        const serviceOwner = await this.createServiceOwnerService.execute(validatedData)
        return {
            statusCode: 201,
            body: serviceOwner
        }
    }
}
