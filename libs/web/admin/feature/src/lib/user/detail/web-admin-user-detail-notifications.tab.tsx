import { useAdminUserNotifications } from '@pubkey-collections/web/admin/data-access'
import { AdminUiNotificationTable } from '@pubkey-collections/web/admin/ui'
import {
  UiAlert,
  UiCard,
  UiDebugModal,
  UiLoader,
  UiPagination,
  UiSearchField,
  UiStack,
} from '@pubkey-collections/web/ui/core'
import { Button, Group } from '@mantine/core'

export function WebAdminUserDetailNotificationsTab({ userId }: { userId: string }) {
  const { query, setSearch, pagination, poke, deleteNotification } = useAdminUserNotifications(userId)

  return (
    <UiStack>
      <UiCard>
        <Group>
          <UiSearchField placeholder="Search notifications" setSearch={setSearch} />
          <Button onClick={poke}>Poke</Button>
          <UiDebugModal data={query.data} />
        </Group>
      </UiCard>
      {query.isLoading ? (
        <UiLoader />
      ) : query.data?.items?.length ? (
        <AdminUiNotificationTable notifications={query.data?.items ?? []} deleteNotification={deleteNotification} />
      ) : (
        <UiAlert message="No notifications found" />
      )}
      <UiCard>
        <UiPagination pagination={pagination} />
      </UiCard>
    </UiStack>
  )
}
