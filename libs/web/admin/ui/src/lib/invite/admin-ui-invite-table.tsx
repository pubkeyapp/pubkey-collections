import { Invite } from '@pubkey-collections/sdk'
import { UiCopy, UiTime } from '@pubkey-collections/web/ui/core'
import { ActionIcon, Anchor, Avatar, Code, Group, ScrollArea, Text, useMantineTheme } from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons-react'
import { DataTable } from 'mantine-datatable'
import { Link } from 'react-router-dom'

interface AdminInviteTableProps {
  invites: Invite[]
  deleteInvite: (invite: Invite) => void
}

export function AdminUiInviteTable({ deleteInvite, invites }: AdminInviteTableProps) {
  const theme = useMantineTheme()
  return (
    <ScrollArea>
      <DataTable
        withBorder
        shadow="xs"
        columns={[
          {
            accessor: 'code',
            // textAlignment: 'center',
            render: (item) => {
              const link = `/admin/invites/${item.id}`
              return (
                <Group spacing={0}>
                  <Anchor component={Link} to={link}>
                    <Code color="brand">{item.code}</Code>
                  </Anchor>
                  <UiCopy text={item?.inviteUrl ?? ''} tooltip="Copy invite URL" />
                </Group>
              )
            },
          },
          {
            title: 'Inviter',
            accessor: 'owner.name',
            render: (item) => (
              <Anchor component={Link} to={`/admin/users/${item?.owner?.id}`} color={theme.colors.brand[4]}>
                <Group spacing="xs">
                  <Avatar size="sm" src={item?.owner?.avatarUrl ?? ''} radius={50} />
                  <Text>{item.owner?.username}</Text>
                </Group>
              </Anchor>
            ),
          },
          {
            title: 'Expires',
            accessor: 'expiresAt',
            textAlignment: 'center',
            render: (item) => {
              return (
                <Text>
                  {item?.expiresAt ? (
                    <UiTime color={undefined} size={undefined} datetime={new Date(item.expiresAt)} />
                  ) : (
                    'Never'
                  )}
                </Text>
              )
            },
          },
          {
            title: 'Uses',
            accessor: 'useCount',
            textAlignment: 'center',
            render: (item) => <Text>{(item?.maxUses ?? 0) > 0 ? `${item.useCount} / ${item.maxUses}` : 'None'}</Text>,
          },
          {
            accessor: 'actions',
            title: <Text mr="xs">Actions</Text>,
            textAlignment: 'right',
            render: (item) => (
              <Group spacing={0} noWrap position="right">
                <ActionIcon color="brand" component={Link} to={`/admin/invites/${item.id}/settings`}>
                  <IconPencil size={16} />
                </ActionIcon>
                <ActionIcon color="red" onClick={() => deleteInvite(item)}>
                  <IconTrash size={16} />
                </ActionIcon>
              </Group>
            ),
          },
        ]}
        records={invites}
      />
    </ScrollArea>
  )
}
