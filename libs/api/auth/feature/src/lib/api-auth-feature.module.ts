import { ApiAuthDataAccessModule } from '@pubkey-collections/api/auth/data-access'
import { Module } from '@nestjs/common'
import { ApiAuthResolver } from './api-auth.resolver'

@Module({
  imports: [ApiAuthDataAccessModule],
  providers: [ApiAuthResolver],
})
export class ApiAuthFeatureModule {}
