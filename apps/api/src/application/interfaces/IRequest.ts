import type { Request } from 'express'
import { IKeycloakJwtPayload } from '../schemas/IKeycloakJwtPayload'

import { IKeycloakJwtPayload } from '../schemas/IKeycloakJwtPayload'

import { IKeycloakJwtPayload } from '../schemas/IKeycloakJwtPayload'

export interface IRequest extends Request {
  metadata?: {
    user?: IKeycloakJwtPayload
  }
  user?: IKeycloakJwtPayload
}
