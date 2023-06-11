import { Injectable } from '@nestjs/common'
import { User as PrismaUser, UserRole, UserStatus } from '@prisma/client'
import { ApiCoreConfigService } from './api-core-config.service'
import { ApiCoreDataService } from './api-core-data.service'

@Injectable()
export class ApiCoreService {
  constructor(readonly config: ApiCoreConfigService, readonly data: ApiCoreDataService) {}

  async ensureUser(userId: string): Promise<PrismaUser> {
    const user = await this.getUserById(userId)

    if (!user) {
      throw new Error('Unauthorized: No such user')
    }
    return user
  }

  async ensureUserActive(userId: string): Promise<PrismaUser> {
    const user = await this.ensureUser(userId)

    if (user.status !== UserStatus.Active) {
      throw new Error('Unauthorized: Not an active user')
    }
    return user
  }

  async ensureUserAdmin(userId: string): Promise<PrismaUser> {
    const user = await this.ensureUserActive(userId)

    if (user.role !== UserRole.Admin) {
      throw new Error('Unauthorized: Not an admin')
    }
    return user
  }

  async getUserRole(userId: string): Promise<UserRole> {
    const user = await this.ensureUserActive(userId)

    return user.role
  }

  async isUserAdmin(userId: string): Promise<boolean> {
    const role = await this.getUserRole(userId)

    return role === UserRole.Admin
  }

  getUserById(userId: string) {
    return this.data.user.findUnique({ where: { id: userId }, include: { emails: true, identities: true } })
  }

  uptime() {
    return process.uptime()
  }
}
