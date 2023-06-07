import { ApiCoreDataAccessModule } from '@pubkey-collections/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiIdentityAdminService } from './api-identity-admin.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiIdentityAdminService],
  exports: [ApiIdentityAdminService],
})
export class ApiIdentityDataAccessModule {}
