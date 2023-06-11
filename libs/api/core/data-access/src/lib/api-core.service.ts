import { Injectable, OnModuleInit } from '@nestjs/common'
import { User as PrismaUser, UserRole, UserStatus } from '@prisma/client'
import { WrappedConnection } from '@pubkeyapp/connection'
import { join } from 'path'
import { writeFileSync } from 'fs'
import { ApiCoreConfigService } from './api-core-config.service'
import { ApiCoreDataService } from './api-core-data.service'

@Injectable()
export class ApiCoreService implements OnModuleInit {
  readonly connection = new WrappedConnection(process.env['SOLANA_RPC_URL'] ?? '')
  constructor(readonly config: ApiCoreConfigService, readonly data: ApiCoreDataService) {}

  async onModuleInit() {
    // const account = 'WoMbiTtXKwUtf4wosoffv45khVF8yA2mPkinGosCFQ4'
    // this.connection.getAllAssetsByGroup(account).then((res) => {
    //   console.log(`Found ${res.length} assets for ${account}`)
    //   // console.log(JSON.stringify(res.length, null, 2))
    //   const filename = join(process.cwd(), 'tmp', account + '.json')
    //   console.log('Writing to', filename)
    //   writeFileSync(filename, JSON.stringify(res, null, 2))
    // })
  }

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
