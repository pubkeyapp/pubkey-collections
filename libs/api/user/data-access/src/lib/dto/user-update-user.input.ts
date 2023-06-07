import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class UserUpdateUserInput {
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
}
