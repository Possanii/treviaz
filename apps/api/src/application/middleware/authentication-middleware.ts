import { env } from '@treviaz/env'
import { verify } from 'jsonwebtoken'

import { JwtError } from '../errors/jwt-error'
import { IData, IMiddleware } from '../interfaces/IMiddleware'
import { IRequest } from '../interfaces/IRequest'
import { IResponse } from '../interfaces/IResponse'
import { ISupabaseJwtSchema } from '../schemas/ISupabase-jwt-payload'

export class AuthenticationMiddleware implements IMiddleware {
  async handle({ headers }: IRequest): Promise<IResponse | IData> {
    const { authorization } = headers

    if (!authorization) {
      throw new JwtError()
    }

    try {
      const payload = verify(
        authorization,
        env.JWT_SECRET_KEY
      ) as ISupabaseJwtSchema

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
