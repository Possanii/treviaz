import type { NextFunction, Response } from 'express'

import BaseError from '../errors/base-error'
import { InternalServerError } from '../errors/internal-server-error'
import { IRequest } from '../interfaces/IRequest'

const normalizeError = (err: Error) => {
  if (err instanceof BaseError) {
    return err
  }

  return new InternalServerError(err)
}

export function errorHandler(
  err: Error,
  req: IRequest,
  res: Response,
  next: NextFunction
) {
  if (res.headersSent) {
    return next(err)
  }

  const error = normalizeError(err)

  const statusCode = error.statusCode
  const message = error.getMessage()
  const body = error.getBody()

  const responseBody = {
    message,
    ...(body || {}),
  }

  res.status(statusCode).json(responseBody)
}
