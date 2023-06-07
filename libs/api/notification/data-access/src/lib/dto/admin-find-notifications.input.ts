import { Field, InputType, Int } from '@nestjs/graphql'

@InputType()
export class AdminFindNotificationsInput {
  @Field({ nullable: true })
  search?: string
  @Field({ nullable: true })
  owner?: string
  @Field(() => Int, { nullable: true, defaultValue: 0 })
  skip?: number
  @Field(() => Int, { nullable: true, defaultValue: 10 })
  take?: number
}
