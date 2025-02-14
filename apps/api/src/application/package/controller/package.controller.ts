import { Request } from 'express'

import { IResponse } from '@/application/interfaces/IResponse'
import { zodValidator } from '@/server/adapters/zodValidator'

import { createPackageSchema } from '../dto/package.dto'
import { PackageService } from '../service/package.service'
import { IPackageController } from './package.controller.interface'

export class PackageController implements IPackageController {
  constructor(private readonly packageService: PackageService) {}

  async createPackage(req: Request): Promise<IResponse> {
    const data = zodValidator(createPackageSchema, req.body)

    const packageData = await this.packageService.createPackage(data)

    return {
      statusCode: 201,
      body: { package: packageData },
    }
  }
}
