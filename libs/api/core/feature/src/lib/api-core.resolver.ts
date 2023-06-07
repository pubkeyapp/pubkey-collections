import { ApiCoreService } from '@pubkey-collections/api/core/data-access'
import { Float, Query, Resolver } from '@nestjs/graphql'

@Resolver()
export class ApiCoreResolver {
  constructor(private readonly service: ApiCoreService) {}

  @Query(() => Float)
  uptime() {
    return this.service.uptime()
  }
}
