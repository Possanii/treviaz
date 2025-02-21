import { NotFoundError } from '@/application/errors/not-found-error'
import { UnauthorizedError } from '@/application/errors/unauthorized-error'
import { prisma } from '@/application/libs/prisma'
import { IUser } from '@/application/schemas/IUser'
import { KeycloakService } from './keycloak-service'

interface SignInRequest {
  email: string
  password: string
}

interface SignInResponse {
  access_token: string
  expires_in: number
  refresh_token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export class SignInService {
  constructor(private keycloakService: KeycloakService) {}

  async execute({ email, password }: SignInRequest): Promise<SignInResponse> {
    try {
      // First, authenticate with Keycloak
      const tokens = await this.keycloakService.getTokensByPassword(
        email,
        password
      )

      // Then, get user from our database
      const user = await prisma.user.findUnique({
        where: { email },
      })

      if (!user) {
        throw new NotFoundError('user', 'User not found')
      }

      return {
        access_token: tokens.access_token,
        expires_in: tokens.expires_in,
        refresh_token: tokens.refresh_token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      }
    } catch (error) {
      throw new UnauthorizedError('Invalid credentials')
    }
  }
}
