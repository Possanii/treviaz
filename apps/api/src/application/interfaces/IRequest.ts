import type { Request } from 'express'

import { IUser } from '@/application/schemas/IUser'

import { IKeycloakJwtPayload } from '../schemas/IKeycloakJwtPayload'

export interface IRequest extends Request {
  metadata?: IKeycloakJwtPayload & {
    user?: IUser
  }
}
