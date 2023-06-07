import { INestApplication, Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { Prisma, PrismaClient, UserStatus } from '@prisma/client'
import { ApiCoreConfigService } from './api-core-config.service'
import { hashPassword, slugifyId } from './api-core.helpers'
import { fakeUsers, provisionUsers } from './api-core.provision'

@Injectable()
export class ApiCoreDataService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(ApiCoreDataService.name)

  constructor(private readonly config: ApiCoreConfigService) {
    super()
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close()
      this.logger.verbose(`Disconnected from database`)
    })
  }

  async onModuleInit() {
    await this.$connect()
    this.logger.verbose(`Connected to database`)
    if (this.config.databaseReset) {
      await this.resetDatabase()
      this.logger.verbose(`Reset database`)
    }
    if (this.config.databaseProvision) {
      await this.provisionDatabase()
      this.logger.verbose(`Provisioned database`)
    }
    if (this.config.databaseReset && this.config.databaseRandomData) {
      await this.generateRandomData()
      this.logger.verbose(`Generated random data`)
    }
  }

  private async generateRandomData() {
    await Promise.all(fakeUsers(42).map((user) => this.provisionUser(user)))
  }

  private async provisionDatabase() {
    await this.provisionUsers()
  }

  private async provisionUsers() {
    await Promise.all(provisionUsers.map((user) => this.provisionUser(user)))
  }

  private async provisionUser(input: Prisma.UserCreateInput) {
    const username = slugifyId(input.username)
    const existing = await this.user.count({ where: { username } })
    if (existing < 1) {
      await this.user.create({
        data: {
          ...input,
          emails: { create: { email: `${username}@pubkeyapp.dev` } },
          id: username,
          password: input.password ? hashPassword(input.password) : undefined,
          status: input.status ?? UserStatus.Active,
          notifications: {
            create: {
              message: 'Welcome to PubKey!',
            },
          },
        },
      })
      this.logger.verbose(
        `Provisioned ${input.role} ${input.username} ${input.password ? 'and password' : 'and external provider'}`,
      )
      return
    }
    this.logger.verbose(
      `Log in with ${input.role} ${input.username} ${input.password ? 'and password' : 'an external provider'}`,
    )
  }

  private async resetDatabase() {
    await this.identity.deleteMany()
    await this.invite.deleteMany()
    await this.email.deleteMany()
    await this.notification.deleteMany()
    await this.user.deleteMany()
  }
}
