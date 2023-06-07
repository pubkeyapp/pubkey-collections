import { Field, ObjectType } from '@nestjs/graphql'
import { IdentityProvider } from './identity-provider.enum'

@ObjectType()
export class Identity {
  @Field()
  id!: string
  @Field()
  createdAt!: Date
  @Field()
  updatedAt!: Date

  @Field(() => IdentityProvider)
  provider!: IdentityProvider
  @Field()
  providerId!: string
}
