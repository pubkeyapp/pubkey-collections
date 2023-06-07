import { Module } from '@nestjs/common'
import { ApiCoreDataAccessModule } from '@pubkey-collections/api/core/data-access'
import { ApiInviteAdminService } from './api-invite-admin.service'
import { ApiInviteAnonService } from './api-invite-anon.service'
import { ApiInviteUserService } from './api-invite-user.service'

const providers = [ApiInviteAdminService, ApiInviteAnonService, ApiInviteUserService]

@Module({
  providers,
  exports: providers,
  imports: [ApiCoreDataAccessModule],
})
export class ApiInviteDataAccessModule {}
