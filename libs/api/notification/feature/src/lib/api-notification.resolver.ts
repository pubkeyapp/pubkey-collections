import { Notification } from '@pubkey-collections/api/notification/data-access'
import { Resolver } from '@nestjs/graphql'

@Resolver(() => Notification)
export class ApiNotificationResolver {}
