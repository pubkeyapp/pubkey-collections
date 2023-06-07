import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-collections/api/auth/data-access'
import { ApiInviteUserService, Invite } from '@pubkey-collections/api/invite/data-access'
import { User } from '@pubkey-collections/api/user/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiUserInviteResolver {
  constructor(private readonly service: ApiInviteUserService) {}

  @Query(() => Invite, { nullable: true })
  userGetInvite(@CtxUser() user: User) {
    return this.service.userGetInvite(user.id)
  }

  @Query(() => [Invite], { nullable: true })
  userGetInvites(@CtxUser() user: User) {
    return this.service.userGetInvites(user.id)
  }

  @Mutation(() => Invite, { nullable: true })
  userAcceptInvite(@CtxUser() user: User, @Args('code') code: string) {
    return this.service.userAcceptInvite(user.id, code)
  }
}
