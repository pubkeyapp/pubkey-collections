import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class AdminFindIdentitiesInput {
  @Field()
  ownerId!: string
}
