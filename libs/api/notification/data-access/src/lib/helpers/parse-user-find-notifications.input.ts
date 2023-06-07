import { Prisma } from '@prisma/client'
import { UserFindNotificationsInput } from '../dto/user-find-notifications.input'

export interface UserFindNotificationsParsedInput {
  orderBy: Prisma.NotificationOrderByWithRelationInput
  skip?: number
  take?: number
  where: Prisma.NotificationWhereInput
}

export function parseUserFindNotificationsInput(
  ownerId: string,
  input: UserFindNotificationsInput,
): UserFindNotificationsParsedInput {
  return {
    where: getUserFindNotificationsWhere(ownerId, input),
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: { updatedAt: 'desc' },
  }
}

function getUserFindNotificationsWhere(
  ownerId: string,
  input: UserFindNotificationsInput,
): Prisma.NotificationWhereInput {
  const where: Prisma.NotificationWhereInput = {
    owner: { id: ownerId },
  }

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { message: { contains: input.search, mode: 'insensitive' } },
    ]
  }

  return where
}
