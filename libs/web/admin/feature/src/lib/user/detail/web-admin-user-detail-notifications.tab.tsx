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
import { useState } from 'react'

export function WebAdminUserDetailNotificationsTab({ userId }: { userId: string }) {
  const { query, setSearch, pagination, poke, deleteNotification } = useAdminUserNotifications(userId)
  const [queryValue, setQueryValue] = useState('')
  return (
    <UiStack>
      <UiCard>
        <Group>
          <UiSearchField
            placeholder="Search notifications"
            onSearch={() => setSearch(queryValue)}
            value={queryValue}
            setValue={setQueryValue}
          />
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
