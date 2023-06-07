import { ApiCoreService, Paging } from '@pubkey-collections/api/core/data-access'
import { Injectable, Logger } from '@nestjs/common'
import { Notification as PrismaNotification } from '@prisma/client'

import { AdminFindNotificationsInput } from './dto/admin-find-notifications.input'
import { parseAdminFindNotificationsInput } from './helpers/parse-admin-find-notifications.input'

@Injectable()
export class ApiNotificationAdminService {
  private readonly logger = new Logger(ApiNotificationAdminService.name)
  constructor(private readonly core: ApiCoreService) {}

  async adminDeleteNotification(adminId: string, notificationId: string): Promise<boolean> {
    await this.core.ensureUserAdmin(adminId)
    const exists = await this.adminGetNotification(adminId, notificationId)
    if (!exists) {
      throw new Error(`Notification ${notificationId} not found`)
    }

    const deleted = await this.core.data.notification.delete({
      where: { id: notificationId },
    })

    return !!deleted
  }

  async adminFindNotifications(adminId: string, input: AdminFindNotificationsInput): Promise<PrismaNotification[]> {
    await this.core.ensureUserAdmin(adminId)

    const { where, orderBy, take, skip } = parseAdminFindNotificationsInput(input)
    const items = await this.core.data.notification.findMany({ where, orderBy, take, skip, include: { actor: true } })

    return items ?? []
  }

  async adminFindNotificationsCount(adminId: string, input: AdminFindNotificationsInput): Promise<Paging> {
    await this.core.ensureUserAdmin(adminId)

    const { where, orderBy, take, skip } = parseAdminFindNotificationsInput(input)
    const [count, total] = await Promise.all([
      this.core.data.notification.count({ where, orderBy, take, skip }),
      this.core.data.notification.count({ where, orderBy }),
    ])

    return { count, skip, take, total }
  }

  private async adminGetNotification(adminId: string, notificationId: string): Promise<PrismaNotification> {
    await this.core.ensureUserAdmin(adminId)
    const found = await this.core.data.notification.findUnique({
      where: { id: notificationId },
    })
    if (!found) {
      throw new Error(`Notification ${notificationId} not found`)
    }
    return found
  }
}
