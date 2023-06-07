import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-collections/api/auth/data-access'
import { Paging } from '@pubkey-collections/api/core/data-access'
import {
  UserFindNotificationsInput,
  ApiNotificationUserService,
  Notification,
} from '@pubkey-collections/api/notification/data-access'
import { User } from '@pubkey-collections/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiNotificationUserResolver {
  constructor(private readonly service: ApiNotificationUserService) {}

  @Mutation(() => Boolean, { nullable: true })
  userDeleteNotification(@CtxUser() user: User, @Args('notificationId') notificationId: string) {
    return this.service.userDeleteNotification(user.id as string, notificationId)
  }

  @Query(() => [Notification], { nullable: true })
  userFindNotifications(@CtxUser() user: User, @Args('input') input: UserFindNotificationsInput) {
    return this.service.userFindNotifications(user.id as string, input)
  }

  @Query(() => Paging, { nullable: true })
  userFindNotificationsCount(@CtxUser() user: User, @Args('input') input: UserFindNotificationsInput) {
    return this.service.userFindNotificationsCount(user.id as string, input)
  }

  @Mutation(() => Boolean, { nullable: true })
  userPoke(@CtxUser() user: User, @Args('pokeId') pokeId: string) {
    return this.service.userPoke(user.id as string, pokeId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userReadNotification(@CtxUser() user: User, @Args('notificationId') notificationId: string) {
    return this.service.userReadNotification(user.id as string, notificationId)
  }

  @Mutation(() => Boolean, { nullable: true })
  userReadAllNotifications(@CtxUser() user: User) {
    return this.service.userReadAllNotifications(user.id as string)
  }
}
