import { User } from '@pubkey-collections/sdk'
import { WebUserUiVerified } from '@pubkey-collections/web/user/ui'
import { UiGroup } from '@pubkey-collections/web/ui/core'
import { ActionIcon, Anchor, Avatar, Group, ScrollArea, Stack, Text } from '@mantine/core'

import { IconPencil, IconTrash, IconUser } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'
import { WebUiUserRoleBadge } from '../web-ui-user-role-badge'
import { WebUiUserStatusBadge } from '../web-ui-user-status-badge'

interface AdminUserTableProps {
  users: User[]
  deleteUser: (user: User) => void
}

export function AdminUiUserTable({ deleteUser, users = [] }: AdminUserTableProps) {
  return (
    <ScrollArea>
      <DataTable
        borderRadius="sm"
        withBorder
        shadow="xs"
        columns={[
          {
            accessor: 'username',
            render: (item) => {
              const link = `/admin/users/${item.id}`
              return (
                <Group spacing="sm" p={4}>
                  <Avatar component={Link} to={link} size={40} src={item?.avatarUrl} radius={50} />
                  <Stack spacing={1}>
                    <UiGroup position="left" spacing={4} align="baseline">
                      <Anchor component={Link} to={link} size="sm" weight={500}>
                        {item.username}
                      </Anchor>
                      <WebUserUiVerified user={item} />
                    </UiGroup>
                    {item.name ? (
                      <Text component={Link} to={link} size="sm" color="dimmed">
                        {item.name}
                      </Text>
                    ) : null}
                  </Stack>
                </Group>
              )
            },
          },
          {
            accessor: 'role',
            textAlignment: 'center',
            render: (item) => <WebUiUserRoleBadge role={item.role} />,
          },
          {
            accessor: 'status',
            textAlignment: 'center',
            render: (item) => <WebUiUserStatusBadge status={item.status} />,
          },
          {
            accessor: 'actions',
            title: <Text mr="xs">Actions</Text>,
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} position="right" noWrap>
                <ActionIcon color="brand" component={Link} to={`${item.profileUrl}`}>
                  <IconUser size={16} />
                </ActionIcon>
                <ActionIcon color="brand" component={Link} to={`/admin/users/${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() => deleteUser(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={users}
      />
    </ScrollArea>
  )
}
