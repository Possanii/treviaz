import { Package, PrismaClient } from '@prisma/client'
import { IPackageRepo } from './package.repo.interface'
import { ICreatePackage } from '../dto/package.dto'

export class PackageRepo implements IPackageRepo {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: ICreatePackage): Promise<Package> {
    return await this.prisma.package.create({ data })
  }
}
