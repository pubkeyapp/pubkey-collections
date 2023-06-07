import { User } from '@pubkey-collections/api/user/data-access'
import { Field, ObjectType } from '@nestjs/graphql'
import { NotificationType } from './notification-type.entity'

@ObjectType()
export class Notification {
  @Field()
  id!: string
  @Field()
  createdAt!: Date
  @Field()
  updatedAt!: Date
  @Field({ nullable: true })
  message?: string
  @Field(() => NotificationType, { nullable: true })
  type?: NotificationType
  @Field({ nullable: true })
  read?: boolean
  @Field(() => User, { nullable: true })
  actor?: User
}
