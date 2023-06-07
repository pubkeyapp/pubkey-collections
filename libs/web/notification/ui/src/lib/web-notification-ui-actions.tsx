import { Button } from '@mantine/core'
import { Notification, NotificationType, User } from '@pubkey-collections/sdk'
import { useUserNotifications } from '@pubkey-collections/web/notification/data-access'
import { UiGroup } from '@pubkey-collections/web/ui/core'
import { WebUserUiAvatar } from '@pubkey-collections/web/user/ui'
import { IconHandFinger } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export function hasNotificationActions(
  notification: Notification,
): notification is Notification & { type: NotificationType } {
  return notification.type === NotificationType.Poke
}
export function WebNotificationUiActions({ notification }: { notification: Notification }) {
  const { markRead, poke } = useUserNotifications()
  const read = () => markRead(notification)

  switch (notification.type) {
    case NotificationType.Poke:
      return (
        <UiGroup position="right">
          <Button
            size="xs"
            variant="light"
            component={Link}
            to={`/profile/${notification.actor?.username}`}
            leftIcon={<WebUserUiAvatar size={16} user={notification.actor as User} />}
          >
            View profile
          </Button>
          <Button
            size="xs"
            variant="light"
            onClick={() => read().then(() => poke(notification.actor?.id as string))}
            leftIcon={<IconHandFinger size={16} stroke={1.5} />}
          >
            Poke back
          </Button>
        </UiGroup>
      )

    default:
      return null
  }
}
