import { Args, Query, Resolver } from '@nestjs/graphql'
import { ApiInviteAnonService, Invite } from '@pubkey-collections/api/invite/data-access'

@Resolver()
export class ApiInviteAnonResolver {
  constructor(private readonly service: ApiInviteAnonService) {}

  @Query(() => Invite, { nullable: true })
  anonGetInvite(@Args('code') code: string) {
    return this.service.anonGetInvite(code)
  }
}
