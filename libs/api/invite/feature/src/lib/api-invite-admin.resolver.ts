import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-collections/api/auth/data-access'
import { Paging } from '@pubkey-collections/api/core/data-access'
import { AdminFindInvitesInput, ApiInviteAdminService } from '@pubkey-collections/api/invite/data-access'
import { User } from '@pubkey-collections/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { AdminCreateInviteInput, AdminUpdateInviteInput, Invite } from '@pubkey-collections/api/invite/data-access'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiInviteAdminResolver {
  constructor(private readonly service: ApiInviteAdminService) {}

  @Mutation(() => Invite, { nullable: true })
  adminCreateInvite(@CtxUser() user: User, @Args('input') input: AdminCreateInviteInput) {
    return this.service.adminCreateInvite(user.id as string, input)
  }

  @Mutation(() => Invite, { nullable: true })
  adminDeleteInvite(@CtxUser() user: User, @Args('inviteId') inviteId: string) {
    return this.service.adminDeleteInvite(user.id as string, inviteId)
  }

  @Query(() => [Invite], { nullable: true })
  adminFindInvites(@CtxUser() user: User, @Args('input') input: AdminFindInvitesInput) {
    return this.service.adminFindInvites(user.id as string, input)
  }

  @Query(() => Paging, { nullable: true })
  adminFindInvitesCount(@CtxUser() user: User, @Args('input') input: AdminFindInvitesInput) {
    return this.service.adminFindInvitesCount(user.id as string, input)
  }

  @Query(() => Invite, { nullable: true })
  adminGetInvite(@CtxUser() user: User, @Args('inviteId') inviteId: string) {
    return this.service.adminGetInvite(user.id as string, inviteId)
  }

  @Mutation(() => Invite, { nullable: true })
  adminUpdateInvite(
    @CtxUser() user: User,
    @Args('inviteId') inviteId: string,
    @Args('input') input: AdminUpdateInviteInput,
  ) {
    return this.service.adminUpdateInvite(user.id as string, inviteId, input)
  }
}
