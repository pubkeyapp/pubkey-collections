import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { ApiInviteAnonService, Invite } from '@pubkey-collections/api/invite/data-access'

@Resolver(() => Invite)
export class ApiInviteFieldResolver {
  constructor(private readonly service: ApiInviteAnonService) {}
  @ResolveField(() => String, { nullable: true })
  inviteUrl(@Parent() invite: Invite) {
    return this.service.getInviteUrl(invite)
  }

  @ResolveField(() => Boolean, { nullable: true })
  isExpired(@Parent() invite: Invite) {
    return this.service.isExpired(invite)
  }

  @ResolveField(() => Boolean, { nullable: true })
  isUsedUp(@Parent() invite: Invite) {
    return this.service.isUsedUp(invite)
  }
}
