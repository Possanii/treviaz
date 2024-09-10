import { type NextFunction, Request, Response } from 'express'

import { IController } from '@/application/interfaces/IController'

export function routeAdapter(controller: IController) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { statusCode, message, body } = await controller.handle(request)

      response.status(statusCode).json({ body, message })
    } catch (error) {
      next(error)
    }
  }
}
