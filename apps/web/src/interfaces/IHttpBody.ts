export interface IHttpBody {
  status: number
  message: {
    message: string
    errorCode: string
  }
  body?:
    | Record<string, unknown>
    | {
        errors: Record<string, string[]>
      }
    | null
}
