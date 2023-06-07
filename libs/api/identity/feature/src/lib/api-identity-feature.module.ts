import { ApiIdentityDataAccessModule } from '@pubkey-collections/api/identity/data-access'
import { Module } from '@nestjs/common'
import { ApiIdentityAdminResolver } from './api-identity-admin.resolver'

@Module({
  imports: [ApiIdentityDataAccessModule],
  providers: [ApiIdentityAdminResolver],
})
export class ApiIdentityFeatureModule {}
