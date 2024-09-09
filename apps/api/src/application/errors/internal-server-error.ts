import BaseError from './base-error'

export class InternalServerError extends BaseError {
  constructor(err: Error) {
    super(500, 'internal', 'Internal Server Error')

    console.error({
      message: err.message,
      stackTrace: err.stack,
      level: 'fatal',
    })
  }
}
