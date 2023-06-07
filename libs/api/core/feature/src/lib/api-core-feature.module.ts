import { ApiAuthFeatureModule } from '@pubkey-collections/api/auth/feature'
import { ApiCoreDataAccessModule } from '@pubkey-collections/api/core/data-access'
import { ApiEmailFeatureModule } from '@pubkey-collections/api/email/feature'
import { ApiIdentityFeatureModule } from '@pubkey-collections/api/identity/feature'
import { ApiInviteFeatureModule } from '@pubkey-collections/api/invite/feature'
import { ApiNotificationFeatureModule } from '@pubkey-collections/api/notification/feature'
import { ApiUserFeatureModule } from '@pubkey-collections/api/user/feature'
import { Module } from '@nestjs/common'
import { ApiCoreController } from './api-core.controller'
import { ApiCoreResolver } from './api-core.resolver'

const features = [
  ApiAuthFeatureModule,
  ApiEmailFeatureModule,
  ApiIdentityFeatureModule,
  ApiInviteFeatureModule,
  ApiNotificationFeatureModule,
  ApiUserFeatureModule,
]

@Module({
  controllers: [ApiCoreController],
  imports: [ApiCoreDataAccessModule, ...features],
  providers: [ApiCoreResolver],
})
export class ApiCoreFeatureModule {}
