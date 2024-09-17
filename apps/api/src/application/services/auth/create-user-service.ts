import { hash } from 'bcryptjs'

import { BadRequestError } from '@/application/errors/bad-request-error'

import { prisma } from '../../libs/prisma'
import { IUser } from '../../schemas/IUser'

export class CreateUserService {
  async execute({
    email,
    name,
    password,
  }: Pick<IUser, 'email' | 'name' | 'password'>): Promise<void> {
    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new BadRequestError('user', 'User with same email already exists.')
    }

    const passwordHashed = await hash(password, 6)

    await prisma.user.create({
      data: {
        email,
        name,
        passwordHashed,
      },
    })
  }
}
