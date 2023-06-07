import { ApiCoreDataAccessModule } from '@pubkey-collections/api/core/data-access'
import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ApiAuthService } from './api-auth.service'
import { ApiAuthGraphqlGuard } from './guards/api-auth-graphql.guard'
import { ApiAuthJwtStrategy } from './strategies/api-auth-jwt.strategy'

@Module({
  imports: [
    ApiCoreDataAccessModule,
    JwtModule.register({
      global: true,
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '1d' },
    }),
    PassportModule,
  ],
  providers: [ApiAuthService, ApiAuthJwtStrategy, ApiAuthGraphqlGuard],
  exports: [ApiAuthService],
})
export class ApiAuthDataAccessModule {}
