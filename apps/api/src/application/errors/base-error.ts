import { path } from 'ramda'

import errorCodes from './error-codes.json'

class BaseError extends Error {
  statusCode: number
  errorCode: string | undefined
  body?: Record<string, unknown>

  constructor(
    statusCode: number,
    errorPath: string,
    message: string,
    body?: Record<string, unknown>
  ) {
    super(message)

    this.statusCode = statusCode
    this.errorCode = path(errorPath.split('.'), errorCodes)
    this.body = body
  }

  getMessage() {
    return {
      message: this.message,
      errorCode: this.errorCode,
    }
  }

  getBody() {
    return {
      body: this.body,
    }
  }
}

export default BaseError
