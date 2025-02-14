import { NextFunction, Request, Response } from 'express'

import { IResponse } from '@/application/interfaces/IResponse'

export interface IPackageController {
  createPackage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<IResponse>
}
