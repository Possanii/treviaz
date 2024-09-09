import { NextFunction, Response } from 'express'

import { IMiddleware } from '@/application/interfaces/IMiddleware'
import { IRequest } from '@/application/interfaces/IRequest'

export function middlewareAdapter(middleware: IMiddleware) {
  return async (request: IRequest, response: Response, next: NextFunction) => {
    try {
      const result = await middleware.handle(request)

      if ('statusCode' in result) {
        return response.status(result.statusCode).json(result.body)
      }

      request.metadata = {
        ...request.metadata,
        ...result.data,
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}
