import { hash } from 'bcryptjs'

import { BadRequestError } from '@/application/errors/bad-request-error'

import { prisma } from '../../../libs/prisma'
import { IUser } from '../../../schemas/IUser'


import { IUserCondominium } from '../../../schemas/IUserCondominium'

export class CreateUserService {
    async execute(data: Omit<IUser, 'id'> & { password: string, condominium: Omit<IUserCondominium, 'id' | 'user_id' | 'joined_at'> }): Promise<IUser> {
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email }
        })

        if (existingUser) {
            throw new BadRequestError('user', 'User with this email already exists')
        }

        const hashedPassword = await hash(data.password, 12)

        const user = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                document_number: data.document_number,
                avatar_url: data.avatar_url,
                password_hashed: hashedPassword,
                condominiums: {
                    create: {
                        condominium_id: data.condominium.condominium_id,
                        role: data.condominium.role,
                        joined_at: new Date()
                    }
                }
            }
        })

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            document_number: user.document_number,
            avatar_url: user.avatar_url
        }
    }
}

