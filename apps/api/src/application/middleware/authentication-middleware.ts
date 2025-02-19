import { env } from '@treviaz/env'
import axios from 'axios'
import { verify } from 'jsonwebtoken'

import { cookiesStorage } from '../../../../../packages/cookies'
import { JwtError } from '../errors/jwt-error'
import { IData, IMiddleware } from '../interfaces/IMiddleware'
import { IRequest } from '../interfaces/IRequest'
import { IResponse } from '../interfaces/IResponse'
import { IKeycloakJwtPayload, keycloakJwtSchema } from '../schemas/IKeycloakJwtPayload'

export class AuthenticationMiddleware implements IMiddleware {
  private publicKey: string | null = null

  private async getPublicKey(): Promise<string> {
    if (this.publicKey) return this.publicKey

    const response = await axios.get(
      `${env.KEYCLOAK_URL}/realms/${env.KEYCLOAK_REALM}/protocol/openid-connect/certs`
    )
    
    // Get the first key from the JWKS
    const key = response.data.keys[0]
    this.publicKey = `-----BEGIN PUBLIC KEY-----\n${key.n}\n-----END PUBLIC KEY-----`
    
    return this.publicKey
  }

  async handle({ cookies }: IRequest): Promise<IResponse | IData> {
    const authorization = cookies

    if (!authorization[cookiesStorage.API_AUTH_TOKEN]) {
      throw new JwtError()
    }

    try {
      const token = authorization[cookiesStorage.API_AUTH_TOKEN]
      const publicKey = await this.getPublicKey()
      
      const decoded = verify(token, publicKey, {
        algorithms: ['RS256'],
        issuer: `${env.KEYCLOAK_URL}/realms/${env.KEYCLOAK_REALM}`
      })

      const payload = keycloakJwtSchema.parse(decoded) as IKeycloakJwtPayload

      return {
        data: {
          user: payload,
        },
      }
    } catch (error) {
      throw new JwtError()
    }
  }
}
