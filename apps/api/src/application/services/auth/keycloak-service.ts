import { env } from '@treviaz/env'
import qs from 'qs'
import type { z } from 'zod'

import { IKeycloakTokenResponseSchema } from '../../schemas/IKeycloakTokenResponse'
import { IKeycloakUserSchema } from '../../schemas/IKeycloakUser'

// Define types from the schemas
type IKeycloakTokenResponse = z.infer<typeof IKeycloakTokenResponseSchema>
type IKeycloakUser = z.infer<typeof IKeycloakUserSchema>

export class KeycloakService {
  private readonly tokenEndpoint: string
  private readonly usersEndpoint: string
  private adminToken: string | null = null

  constructor() {
    this.tokenEndpoint = `${env.KEYCLOAK_URL}/auth/realms/${env.KEYCLOAK_REALM}/protocol/openid-connect/token`
    this.usersEndpoint = `${env.KEYCLOAK_URL}/auth/admin/realms/${env.KEYCLOAK_REALM}/users`
  }

  private async getAdminToken(): Promise<string | null> {
    if (this.adminToken) return this.adminToken

    const body = {
      grant_type: 'client_credentials',
      client_id: env.KEYCLOAK_CLIENT_ID,
      client_secret: env.KEYCLOAK_CLIENT_SECRET,
    }

    const response = await fetch(this.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(body),
    })

    const data = (await response.json()) as IKeycloakTokenResponse

    this.adminToken = data.access_token
    return this.adminToken
  }

  async getUserByEmail(email: string): Promise<IKeycloakUser> {
    const adminToken = await this.getAdminToken()

    const url = new URL(this.usersEndpoint)

    url.searchParams.append('email', email)
    url.searchParams.append('exact', 'true')

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    })

    const data = (await response.json()) as IKeycloakUser[]

    const user = data[0]

    if (!user) {
      throw new Error('User not found')
    }

    // Validate the user data against the schema
    const validatedUser = IKeycloakUserSchema.parse(user)
    return validatedUser
  }

  async createUser(userData: {
    email: string
    password: string
    firstName: string
    lastName: string
    enabled?: boolean
    emailVerified?: boolean
  }): Promise<string> {
    const adminToken = await this.getAdminToken()

    const keycloakUser = {
      username: userData.email,
      email: userData.email,
      enabled: userData.enabled ?? true,
      emailVerified: userData.emailVerified ?? false,
      firstName: userData.firstName,
      lastName: userData.lastName,
      credentials: [
        {
          type: 'password',
          value: userData.password,
          temporary: false,
        },
      ],
    }

    const response = await fetch(this.usersEndpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(keycloakUser),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error creating user:', errorText)
      throw new Error(
        `Failed to create user: ${response.status} ${response.statusText}`
      )
    }

    // Check if we can get the user ID from the Location header
    const locationHeader = response.headers.get('location')
    if (locationHeader) {
      console.log('Location header:', locationHeader)
      // Extract the user ID from the location header
      // Format is typically: http://localhost:8080/auth/admin/realms/treviaz-realm/users/USER_ID
      const userId = locationHeader.split('/').pop()
      if (userId) {
        console.log(`Retrieved user ID from location header: ${userId}`)
        return userId
      }
    }

    // If we couldn't get the ID from the location header, get it by email
    console.log('User created successfully in Keycloak, fetching ID by email')

    try {
      const user = await this.getUserByEmail(userData.email)
      return user.id
    } catch (error) {
      console.error('Error getting user by email after creation:', error)
      throw new Error('User created but ID could not be retrieved')
    }
  }

  async getAccessToken(
    code: string,
    redirectUri: string
  ): Promise<IKeycloakTokenResponse> {
    const params = {
      grant_type: 'authorization_code',
      client_id: env.KEYCLOAK_CLIENT_ID,
      client_secret: env.KEYCLOAK_CLIENT_SECRET,
      code,
      redirect_uri: redirectUri,
    }

    const response = await fetch(this.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(params),
    })

    const data = await response.json()

    // Validate the response data against the schema
    const validatedData = IKeycloakTokenResponseSchema.parse(data)

    return validatedData
  }

  async refreshToken(refreshToken: string): Promise<IKeycloakTokenResponse> {
    const params = {
      grant_type: 'refresh_token',
      client_id: env.KEYCLOAK_CLIENT_ID,
      client_secret: env.KEYCLOAK_CLIENT_SECRET,
      refresh_token: refreshToken,
    }

    const response = await fetch(this.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(params),
    })

    const data = await response.json()

    // Validate the response data against the schema
    const validatedData = IKeycloakTokenResponseSchema.parse(data)

    return validatedData
  }

  async getTokensByPassword(
    username: string,
    password: string
  ): Promise<IKeycloakTokenResponse> {
    const body = {
      grant_type: 'password',
      client_id: env.KEYCLOAK_CLIENT_ID,
      client_secret: env.KEYCLOAK_CLIENT_SECRET,
      username,
      password,
      scope: 'openid profile email',
    }

    const response = await fetch(this.tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: qs.stringify(body),
    })

    const data = await response.json()

    // Validate the response data against the schema
    const validatedData = IKeycloakTokenResponseSchema.parse(data)

    return validatedData
  }
}
