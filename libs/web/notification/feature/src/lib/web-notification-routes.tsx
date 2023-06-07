import { useUserNotifications } from '@pubkey-collections/web/notification/data-access'
import { WebNotificationUiList } from '@pubkey-collections/web/notification/ui'
import { UiCard, UiContainer, UiPageHeader, UiPagination, UiStack } from '@pubkey-collections/web/ui/core'
import { Button } from '@mantine/core'

export function WebNotificationRoutes() {
  const { pagination, unreadCount, markAllRead, notifications } = useUserNotifications()

  return (
    <UiContainer size="xs">
      <UiStack>
        <UiPageHeader
          title={`Notifications (${unreadCount})`}
          actions={
            <Button disabled={!unreadCount} size="xs" onClick={markAllRead}>
              Mark all as read
            </Button>
          }
        />

        <WebNotificationUiList notifications={notifications} />
        <UiCard>
          <UiPagination pagination={pagination} />
        </UiCard>
      </UiStack>
    </UiContainer>
  )
}
