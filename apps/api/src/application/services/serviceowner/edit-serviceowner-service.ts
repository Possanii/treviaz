import { hash } from 'bcryptjs'
import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { prisma } from '../../libs/prisma'
import { IServiceOwner } from '../../schemas/IServiceOwner'

export class EditServiceOwnerService {
  async execute(
    id: string,
    data: Partial<Omit<IServiceOwner, 'id'>> & { password?: string }
  ): Promise<IServiceOwner> {
    const existingServiceOwner = await prisma.serviceOwner.findUnique({
      where: { id },
    })

    if (!existingServiceOwner) {
      throw new UnprocessableEntityError(
        'serviceOwner',
        'Service owner not found'
      )
    }

    let updateData: any = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      document_number: data.document_number,
    }

    if (data.password) {
      updateData.password_hashed = await hash(data.password, 12)
    }

    const updatedServiceOwner = await prisma.serviceOwner.update({
      where: { id },
      data: updateData,
    })

    return {
      id: updatedServiceOwner.id,
      name: updatedServiceOwner.name,
      email: updatedServiceOwner.email,
      phone: updatedServiceOwner.phone,
      document_number: updatedServiceOwner.document_number,
    }
  }
}
