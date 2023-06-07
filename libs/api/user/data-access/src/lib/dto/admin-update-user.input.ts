import { Field, InputType } from '@nestjs/graphql'
import { UserRole } from '../entity/user-role.entity'
import { UserStatus } from '../entity/user-status.entity'

@InputType()
export class AdminUpdateUserInput {
  @Field(() => UserRole, { nullable: true })
  role?: UserRole
  @Field(() => UserStatus, { nullable: true })
  status?: UserStatus
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
}
