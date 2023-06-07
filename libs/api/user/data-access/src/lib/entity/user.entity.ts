import { Field, HideField, ObjectType } from '@nestjs/graphql'
import { UserRole } from './user-role.entity'
import { UserStatus } from './user-status.entity'

@ObjectType()
export class User {
  @Field()
  id!: string
  @Field()
  createdAt!: Date
  @Field()
  updatedAt!: Date

  @Field(() => UserRole)
  role!: UserRole
  @Field(() => UserStatus)
  status!: UserStatus

  @Field({ nullable: true })
  allowDm?: boolean
  @Field({ nullable: true })
  avatarUrl?: string
  @Field({ nullable: true })
  developer?: boolean
  @Field({ nullable: true })
  language?: string
  @Field({ nullable: true })
  location?: string
  @Field({ nullable: true })
  name?: string
  @Field({ nullable: true })
  username?: string
  @Field({ nullable: true })
  verified?: boolean

  @HideField()
  groups?: unknown[]
  @HideField()
  interests?: unknown[]
}
