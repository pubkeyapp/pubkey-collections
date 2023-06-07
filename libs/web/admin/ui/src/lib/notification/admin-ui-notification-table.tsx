import { Notification } from '@pubkey-collections/sdk'
import { UiDebugModal } from '@pubkey-collections/web/ui/core'
import { ActionIcon, Group, ScrollArea, Stack, Text } from '@mantine/core'

import { IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'

interface AdminNotificationTableProps {
  notifications: Notification[]
  deleteNotification: (notification: Notification) => void
}

export function AdminUiNotificationTable({ deleteNotification, notifications = [] }: AdminNotificationTableProps) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withBorder
        shadow="xs"
        columns={[
          {
            accessor: 'name',
            render: (item) => {
              return (
                <Group spacing="sm" p={4}>
                  <Stack spacing={1}>{item.message}</Stack>
                </Group>
              )
            },
          },
          {
            accessor: 'actions',
            title: <Text mr="xs">Actions</Text>,
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <UiDebugModal data={item} />
                <ActionIcon color="red" onClick={() => deleteNotification(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={notifications}
      />
    </ScrollArea>
  )
}
