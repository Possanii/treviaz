import { env } from '@treviaz/env'
import axios from 'axios'
import qs from 'qs'

interface KeycloakTokenResponse {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
  token_type: string
  id_token: string
  'not-before-policy': number
  session_state: string
  scope: string
}

export class KeycloakService {
  private readonly tokenEndpoint: string

  constructor() {
    this.tokenEndpoint = `${env.KEYCLOAK_URL}/realms/${env.KEYCLOAK_REALM}/protocol/openid-connect/token`
  }

  async getAccessToken(code: string, redirectUri: string): Promise<KeycloakTokenResponse> {
    const data = {
      grant_type: 'authorization_code',
      client_id: env.KEYCLOAK_CLIENT_ID,
      client_secret: env.KEYCLOAK_CLIENT_SECRET,
      code,
      redirect_uri: redirectUri
    }

    const response = await axios.post(
      this.tokenEndpoint,
      qs.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    return response.data
  }

  async refreshToken(refreshToken: string): Promise<KeycloakTokenResponse> {
    const data = {
      grant_type: 'refresh_token',
      client_id: env.KEYCLOAK_CLIENT_ID,
      client_secret: env.KEYCLOAK_CLIENT_SECRET,
      refresh_token: refreshToken
    }

    const response = await axios.post(
      this.tokenEndpoint,
      qs.stringify(data),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    )

    return response.data
  }
} 