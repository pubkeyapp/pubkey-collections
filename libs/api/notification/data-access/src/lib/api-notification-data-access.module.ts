import { ApiCoreDataAccessModule } from '@pubkey-collections/api/core/data-access'
import { Module } from '@nestjs/common'
import { ApiNotificationAdminService } from './api-notification-admin.service'
import { ApiNotificationUserService } from './api-notification-user.service'

@Module({
  imports: [ApiCoreDataAccessModule],
  providers: [ApiNotificationAdminService, ApiNotificationUserService],
  exports: [ApiNotificationAdminService, ApiNotificationUserService],
})
export class ApiNotificationDataAccessModule {}
