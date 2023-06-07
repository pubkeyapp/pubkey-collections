import { getAvatarUrl } from '@pubkey-collections/api/core/data-access'
import { User } from '@pubkey-collections/api/user/data-access'
import { Parent, ResolveField, Resolver } from '@nestjs/graphql'

@Resolver(() => User)
export class ApiUserFieldResolver {
  @ResolveField(() => String, { nullable: true })
  async avatarUrl(@Parent() user: User) {
    return user.avatarUrl?.length ? user.avatarUrl : getAvatarUrl(`pubkey-${user.username}`, { variant: 'pixel' })
  }
}
