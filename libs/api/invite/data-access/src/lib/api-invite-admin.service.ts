import { ApiCoreService } from '@pubkey-collections/api/core/data-access'
import { Injectable, Logger } from '@nestjs/common'
import { generateInviteCode } from './api-invite-helpers'
import { AdminCreateInviteInput } from './dto/admin-create-invite.input'
import { AdminFindInvitesInput } from './dto/admin-find-invites.input'
import { AdminUpdateInviteInput } from './dto/admin-update-invite.input'
import { parseAdminFindInvitesInput } from './helpers/parse-admin-find-invites.input'

@Injectable()
export class ApiInviteAdminService {
  private readonly logger = new Logger(ApiInviteAdminService.name)
  constructor(private readonly core: ApiCoreService) {}

  async adminCreateInvite(adminId: string, input: AdminCreateInviteInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.invite.create({
      data: {
        code: generateInviteCode(),
        ownerId: input.ownerId?.length ? input.ownerId : adminId,
        expiresAt: input.expiresAt?.length ? new Date(input.expiresAt) : undefined,
        maxUses: input.maxUses ?? 0,
      },
      include: { owner: true },
    })
  }

  async adminDeleteInvite(adminId: string, id: string) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.invite.delete({ where: { id } })
  }

  async adminFindInvites(adminId: string, input: AdminFindInvitesInput) {
    await this.core.ensureUserAdmin(adminId)

    const { where, orderBy, take, skip } = parseAdminFindInvitesInput(input)
    const items = await this.core.data.invite.findMany({ where, orderBy, take, skip, include: { owner: true } })

    return items ?? []
  }

  async adminFindInvitesCount(adminId: string, input: AdminFindInvitesInput) {
    await this.core.ensureUserAdmin(adminId)

    const { where, orderBy, take, skip } = parseAdminFindInvitesInput(input)
    const [count, total] = await Promise.all([
      this.core.data.invite.count({ where, orderBy, take, skip }),
      this.core.data.invite.count({ where, orderBy }),
    ])

    return { count, skip, take, total }
  }

  async adminGetInvite(adminId: string, id: string) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.invite.findUnique({ where: { id }, include: { owner: true, users: true } })
  }

  async adminUpdateInvite(adminId: string, id: string, input: AdminUpdateInviteInput) {
    await this.core.ensureUserAdmin(adminId)
    return this.core.data.invite.update({
      where: { id },
      data: { ...input },
    })
  }
}
