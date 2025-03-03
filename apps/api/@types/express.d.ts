import { IKeycloakJwtPayload } from '@/application/schemas/IKeycloakJwtPayload'
import { IUser } from '@/application/schemas/IUser'

declare namespace Express {
  interface Request {
    metadata?: IKeycloakJwtPayload & {
      user?: IUser
    }
  }
}
