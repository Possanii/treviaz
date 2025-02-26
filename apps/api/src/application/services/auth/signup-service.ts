import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { ConflictError } from '@/application/errors/conflict-error'
import { NotFoundError } from '@/application/errors/not-found-error'
import { prisma } from '@/application/libs/prisma'

import { KeycloakService } from './keycloak-service'

interface SignUpRequest {
  name: string
  email: string
  password: string
  document_number?: string
  condominium?: {
    role: string
    condominium_id: string
  }
}

interface SignUpResponse {
  id: string
  name: string
  email: string
  document_number?: string
  condominium?: {
    role: string
    condominium_id: string
  }
}

export class SignUpService {
  constructor(private keycloakService: KeycloakService) {}

  async execute(data: SignUpRequest): Promise<SignUpResponse> {
    console.log('SignUpService received data:', JSON.stringify(data, null, 2))
    
    const { name, email, password, document_number, condominium } = data
    
    // Use transaction to ensure both Keycloak and database operations succeed or fail together
    return await prisma.$transaction(async (tx) => {
      try {
        console.log('Creating user in Keycloak...')
        // Create user in Keycloak and get the ID directly
        const keycloakId = await this.keycloakService.createUser({
          email,
          password,
          firstName: name.split(' ').shift() ?? '',
          lastName: name.split(' ').pop() ?? '',
          enabled: true,
          emailVerified: false,
        })

        console.log('User created in Keycloak with ID:', keycloakId)

        console.log('Creating user in database...')
        // Create user in our database with Keycloak ID reference
        const user = await tx.user.create({
          data: {
            name,
            email,
            keycloak_id: keycloakId,
        
          },
        })

        console.log('User created:', user.id)

        // If condominium info is provided, associate user with condominium
        if (condominium) {
          console.log('Condominium info provided:', condominium)
          const { condominium_id, role } = condominium
          
          console.log('Checking if condominium exists...')
          // Check if condominium exists
          const condominiumExists = await tx.condominium.findUnique({
            where: { id: condominium_id },
          })

          if (!condominiumExists) {
            console.log('Condominium not found:', condominium_id)
            throw new NotFoundError('condominium', 'Condominium not found')
          }

          console.log('Getting role:', role)
          // Get the specified role
          const roleEntity = await tx.role.findFirst({
            where: { name: role },
          })

          if (!roleEntity) {
            console.log('Role not found:', role)
            throw new NotFoundError(`role with name ${role}`, 'Role not found')
          }

          console.log('Creating user-condominium relationship...')
          // Create user-condominium relationship
          await tx.userCondominium.create({
            data: {
              user_id: user.id,
              condominium_id,
              role_id: roleEntity.id,
            },
          })
          
          console.log('User-condominium relationship created')
        }

        const response = {
          id: user.id,
          name: user.name,
          email: user.email,
          document_number,
          condominium,
        }
        
        console.log('Returning response:', JSON.stringify(response, null, 2))
        return response
      } catch (error) {
        console.error('Error in SignUpService:', error)
        
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === 'P2002'
        ) {
          throw new ConflictError('user', 'Email already in use')
        }
        throw error
      }
    })
  }
}
