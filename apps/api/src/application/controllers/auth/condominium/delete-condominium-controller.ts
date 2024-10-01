import z from 'zod'

import { IController } from '@/application/interfaces/IController'
import { IRequest } from '@/application/interfaces/IRequest'
import { IResponse } from '@/application/interfaces/IResponse'
import { DeleteCondominiumService } from '@/application/services/auth/condominium/delete-condominium-service'

const deleteCondominiumSchema = z.object({
    id: z.string().uuid()
})

export class DeleteCondominiumController implements IController {
    constructor(private deleteCondominiumService: DeleteCondominiumService) {}

    async handle(request: IRequest): Promise<IResponse> {
        const validatedData = deleteCondominiumSchema.parse(request.params)
        await this.deleteCondominiumService.execute(validatedData.id)
        return {
            statusCode: 204,
            body: null
        }
    }
}
