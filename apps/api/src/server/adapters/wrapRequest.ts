import { type NextFunction, type Request, type Response } from 'express'

import { IResponse } from '@/application/interfaces/IResponse'

export function wrapRequest(
  handler: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<IResponse>
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.info(
        `Request: \nmethod:${req.method}\noriginalURL:${req.originalUrl}\nBody:${JSON.stringify(req.body)}\nQuery:${JSON.stringify(req.query)}\nParams:${JSON.stringify(req.params)}\nHeaders:${JSON.stringify(req.headers)}`
      )
      const { statusCode, body, message } = await handler(req, res, next)

      res.status(statusCode).json({ body, message })
    } catch (err) {
      next(err)
    }
  }
}
