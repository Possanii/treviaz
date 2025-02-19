import { IKeycloakJwtPayload } from '@/application/schemas/IKeycloakJwtPayload'

declare namespace Express {
  interface Request {
    metadata?: {
      user?: IKeycloakJwtPayload
    }
  }
}
