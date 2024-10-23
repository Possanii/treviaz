import { UnprocessableEntityError } from '@/application/errors/unprocessable-entity-error'
import { prisma } from '../../libs/prisma'
import { ICondominium } from '../../schemas/ICondominium'
import { IAddress } from '../../schemas/IAddress'

export class EditCondominiumService {
    async execute(id: string, data: Partial<Omit<ICondominium, 'id' | 'created_at' | 'updated_at' | 'address_id'>>): Promise<ICondominium> {
        const existingCondominium = await prisma.condominium.findUnique({
            where: { id },
            include: { address: true }
        })

        if (!existingCondominium) {
            throw new UnprocessableEntityError('condominium', 'Condominium not found')
        }

        const { address, ...condominiumData } = data

        let updateData: any = {
            ...condominiumData,
            updated_at: new Date()
        }

        if (address) {
            updateData.address = {
                update: this.formatAddressData(address)
            }
        }

        const updatedCondominium = await prisma.condominium.update({
            where: { id },
            data: updateData,
            include: { address: true }
        })

        return this.formatCondominiumResponse(updatedCondominium)
    }

    private formatAddressData(address: Partial<IAddress>) {
        return {
            street: address.street,
            number: address.number,
            complement: address.complement,
            neighborhood: address.neighborhood,
            city: address.city,
            state: address.state,
            country: address.country,
            zip_code: address.zip_code,
        }
    }

    private formatCondominiumResponse(condominium: any): ICondominium {
        return {
            id: condominium.id,
            name: condominium.name,
            address: condominium.address,
            address_id: condominium.address_id,
            photo_url: condominium.photo_url ?? undefined,
            owner_id: condominium.owner_id,
            created_at: condominium.created_at,
            updated_at: condominium.updated_at,
        }
    }
}
