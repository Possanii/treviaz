import type { Request } from 'express'

import { ISupabaseJwtSchema } from '../schemas/ISupabase-jwt-payload'

export interface IRequest extends Request {
  metadata?: {
    user?: ISupabaseJwtSchema
  }
}
