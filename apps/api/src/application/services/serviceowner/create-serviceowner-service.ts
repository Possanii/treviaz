import { hash } from 'bcryptjs'

import { BadRequestError } from '@/application/errors/bad-request-error'

import { prisma } from '../../libs/prisma'
import { IServiceOwner } from '../../schemas/IServiceOwner'

export class CreateServiceOwnerService {
  async execute(
    data: Omit<IServiceOwner, 'id'> & { password: string }
  ): Promise<IServiceOwner> {
    const existingServiceOwner = await prisma.serviceOwner.findUnique({
      where: { email: data.email },
    })

    if (existingServiceOwner) {
      throw new BadRequestError(
        'serviceOwner',
        'service owner with this email already exists'
      )
    }

    const hashedPassword = await hash(data.password, 12)

    const serviceOwner = await prisma.serviceOwner.create({
      data: {
        name: data.name,
        email: data.email,
        document_number: data.document_number,
        phone: data.phone,
        password_hashed: hashedPassword,
      },
    })

    return {
      id: serviceOwner.id,
      name: serviceOwner.name,
      email: serviceOwner.email,
      document_number: serviceOwner.document_number,
      phone: serviceOwner.phone,
    }
  }
}
