import { User } from '@pubkey-collections/api/user/data-access'
import { Field, Int, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Invite {
  @Field()
  id!: string

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date

  @Field({ nullable: true })
  expiresAt?: Date

  @Field({ nullable: true })
  code?: string

  @Field(() => Int, { nullable: true })
  maxUses?: number

  @Field(() => Int, { nullable: true })
  useCount?: number

  @Field(() => User, { nullable: true })
  owner?: User

  @Field(() => [User], { nullable: true })
  users?: User[]
}
