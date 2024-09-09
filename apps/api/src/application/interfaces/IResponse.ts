export interface IResponse {
  statusCode: number
  message?: string | null
  body?: Record<string, unknown> | null
}
