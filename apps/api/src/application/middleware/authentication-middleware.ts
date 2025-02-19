import { env } from '@treviaz/env'
import { verify } from 'jsonwebtoken'

import { cookiesStorage } from '../../../../../packages/cookies'
import { JwtError } from '../errors/jwt-error'
import { IData, IMiddleware } from '../interfaces/IMiddleware'
import { IRequest } from '../interfaces/IRequest'
import { IResponse } from '../interfaces/IResponse'
import { IKeycloakJwtPayload, keycloakJwtSchema } from '../schemas/IKeycloakJwtPayload'

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ cookies }: IRequest): Promise<IResponse | IData> {
    const authorization = cookies

    if (!authorization[cookiesStorage.API_AUTH_TOKEN]) {
      throw new JwtError()
    }

    try {
      const token = authorization[cookiesStorage.API_AUTH_TOKEN]
      const decoded = verify(token, env.JWT_SECRET_KEY)
      const payload = keycloakJwtSchema.parse(decoded) as IKeycloakJwtPayload

      return {
        data: {
          user: payload,
        },
      }
    } catch {
      throw new JwtError()
    }
  }
}
