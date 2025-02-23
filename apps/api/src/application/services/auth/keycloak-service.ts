import { env } from '@treviaz/env'
import axios from 'axios'
import qs from 'qs'
import { IKeycloakTokenResponseSchema } from '../../schemas/IKeycloakTokenResponse'
import { IKeycloakUserSchema } from '../../schemas/IKeycloakUser'
import type { z } from 'zod'

// Define types from the schemas
type IKeycloakTokenResponse = z.infer<typeof IKeycloakTokenResponseSchema>
type IKeycloakUser = z.infer<typeof IKeycloakUserSchema>

export class KeycloakService {
  private readonly tokenEndpoint: string
  private readonly usersEndpoint: string
  private adminToken: string | null = null

  constructor() {
    this.tokenEndpoint = `${env.KEYCLOAK_URL}/realms/${env.KEYCLOAK_REALM}/protocol/openid-connect/token`
    this.usersEndpoint = `${env.KEYCLOAK_URL}/admin/realms/${env.KEYCLOAK_REALM}/users`
  }

  private async getAdminToken(): Promise<string | null> {
    if (this.adminToken) return this.adminToken

    const data = {
      grant_type: 'client_credentials',
      client_id: env.KEYCLOAK_CLIENT_ID,
      client_secret: env.KEYCLOAK_CLIENT_SECRET,
    }

    const response = await axios.post(this.tokenEndpoint, qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    this.adminToken = response.data.access_token
    return this.adminToken
  }

  async getUserByEmail(email: string): Promise<IKeycloakUser> {
    const adminToken = await this.getAdminToken()

    const response = await axios.get(`${this.usersEndpoint}`, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
      params: {
        email: email,
        exact: true,
      },
    })

    const users = response.data
    if (!users || users.length === 0) {
      throw new Error('User not found')
    }

    // Validate the user data against the schema
    const validatedUser = IKeycloakUserSchema.parse(users[0])
    return validatedUser
  }

  async createUser(userData: {
    email: string
    password: string
    firstName: string
    enabled?: boolean
    emailVerified?: boolean
  }): Promise<void> {
    const adminToken = await this.getAdminToken()

    const keycloakUser = {
      username: userData.email,
      email: userData.email,
      enabled: userData.enabled ?? true,
      emailVerified: userData.emailVerified ?? false,
      firstName: userData.firstName,
      lastName: '', // Added to match schema
      credentials: [
        {
          type: 'password',
          value: userData.password,
          temporary: false,
        },
      ],
    }

    await axios.post(this.usersEndpoint, keycloakUser, {
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
    })
  }

  async getAccessToken(
    code: string,
    redirectUri: string
  ): Promise<IKeycloakTokenResponse> {
    const data = {
      grant_type: 'authorization_code',
      client_id: env.KEYCLOAK_CLIENT_ID,
      client_secret: env.KEYCLOAK_CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
    }

    const response = await axios.post(this.tokenEndpoint, qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return response.data
  }

  async refreshToken(refreshToken: string): Promise<IKeycloakTokenResponse> {
    const data = {
      grant_type: 'refresh_token',
      client_id: env.KEYCLOAK_CLIENT_ID,
      client_secret: env.KEYCLOAK_CLIENT_SECRET,
      refresh_token: refreshToken,
    }

    const response = await axios.post(this.tokenEndpoint, qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    return response.data
  }

  async getTokensByPassword(
    username: string,
    password: string
  ): Promise<IKeycloakTokenResponse> {
    const data = {
      grant_type: 'password',
      client_id: env.KEYCLOAK_CLIENT_ID,
      client_secret: env.KEYCLOAK_CLIENT_SECRET,
      username,
      password,
      scope: 'openid profile email',
    }

    const response = await axios.post(this.tokenEndpoint, qs.stringify(data), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })

    // Validate the response data against the schema
    const validatedData = IKeycloakTokenResponseSchema.parse(response.data)
    return validatedData
  }
}
