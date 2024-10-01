import { BadRequestError } from '@/application/errors/bad-request-error'
import { prisma } from '../../../libs/prisma'
import { ICondominium } from '../../../schemas/ICondominium'
import { IAddress } from '../../../schemas/IAddress'

export class CreateCondominiumService {
    async execute(data: Omit<ICondominium, 'id' | 'created_at' | 'updated_at' | 'address_id'>): Promise<ICondominium> {
        const existingCondominium = await prisma.condominium.findFirst({
            where: { name: data.name }
        })

        if (existingCondominium) {
            throw new BadRequestError('condominium', 'Condominium with this name already exists')
        }

        const address = await prisma.address.create({
            data: {
                street: data.address.street,
                number: data.address.number,
                complement: data.address.complement,
                neighborhood: data.address.neighborhood,
                city: data.address.city,
                state: data.address.state,
                country: data.address.country,
                zip_code: data.address.zip_code
            }
        })

        const condominium = await prisma.condominium.create({
            data: {
                name: data.name,
                address: {
                    connect: {
                        id: address.id
                    }
                },
                photo_url: data.photo_url,
                owner_id: data.owner_id
            },
            include: {
                address: true
            }
        })

        return {
            id: condominium.id,
            name: condominium.name,
            address: {
                id: condominium.address.id,
                street: condominium.address.street,
                number: condominium.address.number,
                complement: condominium.address.complement ?? undefined,
                neighborhood: condominium.address.neighborhood,
                city: condominium.address.city,
                state: condominium.address.state,
                country: condominium.address.country,
                zip_code: condominium.address.zip_code,
            },
            address_id: condominium.address_id,
            photo_url: condominium.photo_url ?? undefined,
            owner_id: condominium.owner_id,
            created_at: condominium.created_at,
            updated_at: condominium.updated_at
        }
    }
}
