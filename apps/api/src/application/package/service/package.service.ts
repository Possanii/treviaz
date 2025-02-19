import { Package } from '@prisma/client'

import { ICreatePackage } from '../dto/package.dto'
import { PackageRepo } from '../repo/package.repo'
import { IPackageService } from './package.service.interface'

export class PackageService implements IPackageService {
  constructor(private readonly packageRepo: PackageRepo) {}

  async createPackage(data: ICreatePackage): Promise<Package> {
    return await this.packageRepo.create(data)
  }
}
