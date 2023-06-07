import { Module } from '@nestjs/common'
import { ApiInviteDataAccessModule } from '@pubkey-collections/api/invite/data-access'
import { ApiInviteAdminResolver } from './api-invite-admin.resolver'
import { ApiInviteAnonResolver } from './api-invite-anon.resolver'

import { ApiInviteFieldResolver } from './api-invite-field.resolver'
import { ApiUserInviteResolver } from './api-user-invite.resolver'

@Module({
  imports: [ApiInviteDataAccessModule],
  providers: [ApiInviteAdminResolver, ApiInviteAnonResolver, ApiInviteFieldResolver, ApiUserInviteResolver],
})
export class ApiInviteFeatureModule {}
