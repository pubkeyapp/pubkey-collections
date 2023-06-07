import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-collections/api/auth/data-access'
import { Paging } from '@pubkey-collections/api/core/data-access'
import {
  AdminFindNotificationsInput,
  ApiNotificationAdminService,
  Notification,
} from '@pubkey-collections/api/notification/data-access'
import { User } from '@pubkey-collections/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiNotificationAdminResolver {
  constructor(private readonly service: ApiNotificationAdminService) {}

  @Mutation(() => Boolean, { nullable: true })
  adminDeleteNotification(@CtxUser() user: User, @Args('notificationId') notificationId: string) {
    return this.service.adminDeleteNotification(user.id as string, notificationId)
  }

  @Query(() => [Notification], { nullable: true })
  adminFindNotifications(@CtxUser() user: User, @Args('input') input: AdminFindNotificationsInput) {
    return this.service.adminFindNotifications(user.id as string, input)
  }

  @Query(() => Paging, { nullable: true })
  adminFindNotificationsCount(@CtxUser() user: User, @Args('input') input: AdminFindNotificationsInput) {
    return this.service.adminFindNotificationsCount(user.id as string, input)
  }
}
