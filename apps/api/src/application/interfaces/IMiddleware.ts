import { IRequest } from './IRequest'
import type { IResponse } from './IResponse'

export interface IData {
  data: Record<string, unknown>
}

export interface IMiddleware {
  handle(request: IRequest): Promise<IResponse | IData>
}
