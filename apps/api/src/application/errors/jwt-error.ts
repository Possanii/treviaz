import BaseError from './base-error'

export class JwtError extends BaseError {
  constructor() {
    super(401, 'unauthorized_jwt', 'Your access token has been expired.')
  }
}
