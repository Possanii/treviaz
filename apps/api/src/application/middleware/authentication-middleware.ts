import { env } from '@treviaz/env'
import axios from 'axios'
import { verify } from 'jsonwebtoken'
import jwkToPem from 'jwk-to-pem'

import { cookiesStorage } from '../../../../../packages/cookies'
import { JwtError } from '../errors/jwt-error'
import { IData, IMiddleware } from '../interfaces/IMiddleware'
import { IRequest } from '../interfaces/IRequest'
import { IResponse } from '../interfaces/IResponse'
import { IKeycloakJwtPayload, keycloakJwtSchema } from '../schemas/IKeycloakJwtPayload'

interface JWK {
  kid: string
  kty: string
  alg: string
  use: string
  n: string
  e: string
}

export class AuthenticationMiddleware implements IMiddleware {
  private publicKeys: Map<string, string> = new Map()

  private async getPublicKey(kid: string): Promise<string> {
    const cachedKey = this.publicKeys.get(kid)
    if (cachedKey) return cachedKey

    const response = await axios.get(
      `${env.KEYCLOAK_URL}/realms/${env.KEYCLOAK_REALM}/protocol/openid-connect/certs`
    )
    
    const keys = response.data.keys as JWK[]
    for (const key of keys) {
      const publicKey = jwkToPem(key as any)
      this.publicKeys.set(key.kid, publicKey)
    }

    const publicKey = this.publicKeys.get(kid)
    if (!publicKey) {
      throw new JwtError()
    }

    return publicKey
  }

  private decodeTokenHeader(token: string): { kid: string } {
    const [headerBase64] = token.split('.')
    const header = JSON.parse(Buffer.from(headerBase64, 'base64').toString())
    return header
  }

  async handle({ cookies }: IRequest): Promise<IResponse | IData> {
    const authorization = cookies

    if (!authorization[cookiesStorage.API_AUTH_TOKEN]) {
      throw new JwtError()
    }

    try {
      const token = authorization[cookiesStorage.API_AUTH_TOKEN]
      const { kid } = this.decodeTokenHeader(token)
      const publicKey = await this.getPublicKey(kid)
      
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
