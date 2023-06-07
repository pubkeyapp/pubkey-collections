import { Prisma } from '@prisma/client'
import { AdminFindInvitesInput } from '../dto/admin-find-invites.input'

export interface AdminFindInvitesParsedInput {
  orderBy: Prisma.InviteOrderByWithRelationInput
  skip?: number
  take?: number
  where: Prisma.InviteWhereInput
}

export function parseAdminFindInvitesInput(input: AdminFindInvitesInput): AdminFindInvitesParsedInput {
  return {
    where: getAdminFindInvitesWhere(input),
    skip: input.skip ?? 0,
    take: input.take ?? 10,
    orderBy: { updatedAt: 'desc' },
  }
}

function getAdminFindInvitesWhere(input: AdminFindInvitesInput): Prisma.InviteWhereInput {
  const where: Prisma.InviteWhereInput = {}

  if (input.search) {
    where.OR = [
      { id: { contains: input.search, mode: 'insensitive' } },
      { code: { contains: input.search, mode: 'insensitive' } },
      { owner: { username: { contains: input.search, mode: 'insensitive' } } },
    ]
  }

  if (input.ownerId) {
    where.ownerId = input.ownerId
  }

  return where
}
