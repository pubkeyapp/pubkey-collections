import { ApiCoreService, Paging } from '@pubkey-collections/api/core/data-access'
import { Injectable, Logger } from '@nestjs/common'
import { Notification as PrismaNotification, NotificationType } from '@prisma/client'

import { UserFindNotificationsInput } from './dto/user-find-notifications.input'
import { parseUserFindNotificationsInput } from './helpers/parse-user-find-notifications.input'

@Injectable()
export class ApiNotificationUserService {
  private readonly logger = new Logger(ApiNotificationUserService.name)
  constructor(private readonly core: ApiCoreService) {}

  async userDeleteNotification(userId: string, notificationId: string): Promise<boolean> {
    await this.core.ensureUserActive(userId)
    const exists = await this.userGetNotification(userId, notificationId)
    if (!exists) {
      throw new Error(`Notification ${notificationId} not found`)
    }

    const deleted = await this.core.data.notification.delete({
      where: { id: notificationId },
    })

    return !!deleted
  }

  async userFindNotifications(userId: string, input: UserFindNotificationsInput): Promise<PrismaNotification[]> {
    await this.core.ensureUserActive(userId)

    const { where, orderBy, take, skip } = parseUserFindNotificationsInput(userId, input)
    const items = await this.core.data.notification.findMany({ where, orderBy, take, skip, include: { actor: true } })

    return items ?? []
  }

  async userFindNotificationsCount(userId: string, input: UserFindNotificationsInput): Promise<Paging> {
    await this.core.ensureUserActive(userId)

    const { where, orderBy, take, skip } = parseUserFindNotificationsInput(userId, input)
    const [count, total] = await Promise.all([
      this.core.data.notification.count({ where, orderBy, take, skip }),
      this.core.data.notification.count({ where, orderBy }),
    ])

    return { count, skip, take, total }
  }

  private async userGetNotification(userId: string, notificationId: string): Promise<PrismaNotification> {
    await this.core.ensureUserActive(userId)
    const found = await this.core.data.notification.findFirst({
      where: {
        id: notificationId,
        ownerId: userId,
      },
    })
    if (!found) {
      throw new Error(`Notification ${notificationId} not found`)
    }
    return found
  }

  async userPoke(userId: string, pokeId: string) {
    const user = await this.core.ensureUserActive(userId)

    if (user.id === pokeId) {
      throw new Error(`You can't poke yourself`)
    }

    const exists = await this.core.data.notification.count({
      where: {
        type: NotificationType.Poke,
        owner: { id: pokeId },
        actor: { id: user.id },
        read: false,
      },
    })
    if (exists) {
      throw new Error(`You can't poke ${pokeId} more than once`)
    }

    const created = await this.core.data.notification.create({
      data: {
        type: NotificationType.Poke,
        owner: { connect: { id: pokeId } },
        actor: { connect: { id: user.id } },
        message: `You have been poked by ${user.username}`,
      },
    })

    return !!created
  }

  async userReadNotification(userId: string, notificationId: string) {
    const found = await this.userGetNotification(userId, notificationId)
    if (!found) {
      throw new Error(`Notification ${notificationId} not found`)
    }
    const updated = await this.core.data.notification.update({
      where: { id: notificationId },
      data: { read: true, readAt: new Date() },
    })
    return !!updated
  }

  async userReadAllNotifications(userId: string) {
    await this.core.ensureUserActive(userId)
    const updated = await this.core.data.notification.updateMany({
      where: { ownerId: userId },
      data: { read: true, readAt: new Date() },
    })
    return !!updated
  }
}
