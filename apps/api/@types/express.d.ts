declare namespace Express {
  interface Request {
    metadata?: {
      user?: {
        sub: string
        role: string
      }
    }
  }
}
