import { Notification } from '@pubkey-collections/sdk'
import { useUserNotifications } from '@pubkey-collections/web/notification/data-access'
import { Accordion, Text } from '@mantine/core'
import { useMemo } from 'react'
import { WebNotificationIcon } from './web-notification-icon'
import { hasNotificationActions, WebNotificationUiActions } from './web-notification-ui-actions'

export function WebNotificationUiList({ notifications }: { notifications: Notification[] }) {
  const { markRead } = useUserNotifications()
  const open = useMemo(
    () => notifications.filter((notification) => !notification.read).map((notification) => notification.id),
    [notifications],
  )

  return (
    <Accordion variant="contained" multiple defaultValue={open ?? []}>
      {notifications.map((notification) => {
        const hasActions = hasNotificationActions(notification)
        return (
          <Accordion.Item
            value={notification.id}
            key={notification.id}
            onClick={() => !notification.read && markRead(notification)}
          >
            <Accordion.Control icon={<WebNotificationIcon notification={notification} />}>
              <Text
                size="sm"
                weight={notification.read ? undefined : 'bold'}
                color={notification.read ? 'dimmed' : undefined}
              >
                {notification.message}
              </Text>
            </Accordion.Control>
            {hasActions ? (
              <Accordion.Panel>
                <WebNotificationUiActions notification={notification} />
              </Accordion.Panel>
            ) : null}
          </Accordion.Item>
        )
      })}
    </Accordion>
  )
}
