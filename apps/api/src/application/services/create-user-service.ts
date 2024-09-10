import { prisma } from '../libs/prisma'
import { IUser } from '../schemas/IUser'

export class CreateUserService {
  async execute({
    email,
    name,
  }: Pick<IUser, 'email' | 'name'>): Promise<IUser> {
    return await prisma.user.create({
      data: {
        email,
        name,
      },
    })
  }
}
