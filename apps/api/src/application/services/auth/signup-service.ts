import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import { ConflictError } from '@/application/errors/conflict-error'
import { prisma } from '@/application/libs/prisma'

import { KeycloakService } from './keycloak-service'

interface SignUpRequest {
  name: string
  email: string
  password: string
}

interface SignUpResponse {
  id: string
  name: string
  email: string
}

export class SignUpService {
  constructor(private keycloakService: KeycloakService) {}

  async execute({
    name,
    email,
    password,
  }: SignUpRequest): Promise<SignUpResponse> {
    // Use transaction to ensure both Keycloak and database operations succeed or fail together
    return await prisma.$transaction(async (tx) => {
      try {
        // First, create user in Keycloak
        await this.keycloakService.createUser({
          email,
          password,
          firstName: name.split(' ').shift() ?? '',
          lastName: name.split(' ').pop() ?? '',
          enabled: true,
          emailVerified: false,
        })

        // Get the Keycloak user to get their ID
        const keycloakUser = await this.keycloakService.getUserByEmail(email)

        // Create user in our database with Keycloak ID reference
        const user = await tx.user.create({
          data: {
            name,
            email,
            keycloak_id: keycloakUser.id,
          },
        })

        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      } catch (error) {
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
