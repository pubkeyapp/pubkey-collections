import { Prisma } from '@prisma/client'
import { AdminFindNotificationsInput } from '../dto/admin-find-notifications.input'

export interface AdminFindNotificationsParsedInput {
  orderBy: Prisma.NotificationOrderByWithRelationInput
  skip?: number
  take?: number
  where: Prisma.NotificationWhereInput
}

export function parseAdminFindNotificationsInput(
  input: AdminFindNotificationsInput,
): AdminFindNotificationsParsedInput {
  return {
    where: getAdminFindNotificationsWhere(input),
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: { updatedAt: 'desc' },
  }
}

function getAdminFindNotificationsWhere(input: AdminFindNotificationsInput): Prisma.NotificationWhereInput {
  const where: Prisma.NotificationWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { message: { contains: input.search, mode: 'insensitive' } },
    ]
  }
  if (input.owner) {
    where.owner = { id: input.owner }
  }

  return where
}
