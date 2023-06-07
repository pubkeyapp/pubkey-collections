import {
  ApiCoreService,
  AppContext,
  hashPassword,
  slugifyId,
  validatePassword,
} from '@pubkey-collections/api/core/data-access'
import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserStatus } from '@prisma/client'
import { LoginInput } from './dto/login.input'
import { RegisterInput } from './dto/register.input'

@Injectable()
export class ApiAuthService {
  constructor(private readonly core: ApiCoreService, private readonly jwt: JwtService) {}

  async login(context: AppContext, input: LoginInput) {
    if (!this.core.config.authPasswordEnabled) {
      throw new Error(`Login with username and password is not allowed.`)
    }
    if (input?.password.length < 8) {
      throw new Error('Password is too short.')
    }
    const user = await this.validateUser(input)
    const token = this.sign({ username: user.username, id: user.id })
    this.setCookie(context, token)

    return user
  }

  logout(context: AppContext) {
    this.resetCookie(context)
    return Promise.resolve(true)
  }

  async register(context: AppContext, input: RegisterInput) {
    if (!this.core.config.authRegisterEnabled) {
      throw new Error(`Registration is disabled.`)
    }
    if (input?.password.length < 8) {
      throw new Error('Password is too short.')
    }
    const username = slugifyId(input.username)
    const exists = await this.core.data.user.findUnique({ where: { username } })
    if (exists) {
      throw new Error('User already exists.')
    }
    const user = await this.core.data.user.create({
      data: {
        username,
        password: hashPassword(input.password),
        status: UserStatus.Created,
        notifications: {
          create: {
            message: 'Welcome to PubKey!',
          },
        },
      },
    })

    const token = this.sign({ username: user.username, id: user.id })
    this.setCookie(context, token)

    return user
  }

  private async validateUser({ username, password }: LoginInput) {
    const user = await this.core.data.user.findUnique({ where: { username } })
    if (!user) {
      throw new Error('User not found.')
    }
    if (!user.password) {
      throw new Error('Login with username and password is not allowed.')
    }
    if (user.status === UserStatus.Inactive) {
      throw new Error('User is inactive.')
    }
    if (!validatePassword(password, user.password)) {
      throw new Error('Password is incorrect.')
    }
    user.password = null
    return user
  }

  private resetCookie(context: AppContext) {
    return context.res.clearCookie(this.core.config.cookieName, this.core.config.cookieOptions(context.req.hostname))
  }

  private setCookie(context: AppContext, token: string) {
    return context.res?.cookie(this.core.config.cookieName, token, this.core.config.cookieOptions(context.req.hostname))
  }

  private sign(payload: { id: string; username: string }): string {
    return this.jwt.sign(payload)
  }
}
