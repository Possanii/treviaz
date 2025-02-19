import { Package, PrismaClient } from '@prisma/client'

import { ICreatePackage } from '../dto/package.dto'
import { IPackageRepo } from './package.repo.interface'

export class PackageRepo implements IPackageRepo {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: ICreatePackage): Promise<Package> {
    return await this.prisma.package.create({ data })
  }
}
