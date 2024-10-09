import { hash } from 'bcryptjs'
import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { prisma } from '../../libs/prisma'
import { IUser } from '../../schemas/IUser'

export class EditUserService {
    async execute(id: string, data: Partial<Omit<IUser, 'id'>> & { password?: string }): Promise<IUser> {
        const existingUser = await prisma.user.findUnique({
            where: { id }
        })

        if (!existingUser) {
            throw new UnprocessableEntityError('user', 'User not found')
        }

        let updateData: any = {
            name: data.name,
            email: data.email,
            document_number: data.document_number,
            avatar_url: data.avatar_url,
        }

        if (data.password) {
            updateData.password_hashed = await hash(data.password, 12)
        }

        const updatedUser = await prisma.user.update({
            where: { id },
            data: updateData
        })

        return {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            document_number: updatedUser.document_number,
            avatar_url: updatedUser.avatar_url
        }
    }
}
