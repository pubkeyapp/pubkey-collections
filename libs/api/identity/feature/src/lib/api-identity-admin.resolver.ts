import { ApiAuthGraphqlGuard, CtxUser } from '@pubkey-collections/api/auth/data-access'
import {
  AdminCreateIdentityInput,
  AdminFindIdentitiesInput,
  ApiIdentityAdminService,
  Identity,
} from '@pubkey-collections/api/identity/data-access'
import { User } from '@pubkey-collections/api/user/data-access'
import { UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'

@Resolver()
@UseGuards(ApiAuthGraphqlGuard)
export class ApiIdentityAdminResolver {
  constructor(private readonly service: ApiIdentityAdminService) {}

  @Mutation(() => Identity, { nullable: true })
  adminCreateIdentity(@CtxUser() user: User, @Args('input') input: AdminCreateIdentityInput) {
    return this.service.adminCreateIdentity(user.id!, input)
  }
  @Mutation(() => Boolean, { nullable: true })
  adminDeleteIdentity(@CtxUser() user: User, @Args('identityId') identityId: string) {
    return this.service.adminDeleteIdentity(user.id!, identityId)
  }
  @Query(() => [Identity], { nullable: true })
  adminFindIdentities(@CtxUser() user: User, @Args('input') input: AdminFindIdentitiesInput) {
    return this.service.adminFindIdentities(user.id!, input)
  }
}
