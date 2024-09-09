import type { Request } from 'express'

export interface IRequest extends Request {
  metadata?: {
    user?: {
      sub: string
      role: string
    }
  }
}
