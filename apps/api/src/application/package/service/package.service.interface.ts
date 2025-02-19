import { Package } from '@prisma/client'

import { ICreatePackage } from '../dto/package.dto'

export interface IPackageService {
  createPackage(data: ICreatePackage): Promise<Package>
}
