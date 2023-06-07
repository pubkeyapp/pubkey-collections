import { ApiNotificationDataAccessModule } from '@pubkey-collections/api/notification/data-access'
import { Module } from '@nestjs/common'
import { ApiNotificationAdminResolver } from './api-notification-admin.resolver'
import { ApiNotificationUserResolver } from './api-notification-user.resolver'
import { ApiNotificationResolver } from './api-notification.resolver'

@Module({
  imports: [ApiNotificationDataAccessModule],
  providers: [ApiNotificationResolver, ApiNotificationUserResolver, ApiNotificationAdminResolver],
})
export class ApiNotificationFeatureModule {}
