import { Avatar, Group, Stack, Text } from '@mantine/core'
import { UiStack, useUiTheme } from '@pubkey-collections/web/ui/core'
import { Collection } from '@pubkeyapp/collections'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function CollectionHeader({ children, collection }: { children?: ReactNode; collection: Collection }) {
  const { isSmall } = useUiTheme()
  return (
    <Stack
      sx={{ flexDirection: 'row' }}
      justify={isSmall ? 'stretch' : 'space-between'}
      align={'center'}
      spacing={isSmall ? 'xs' : 'md'}
    >
      <Group spacing={isSmall ? 4 : 'xs'} sx={{ flexGrow: 1 }}>
        <Avatar size={isSmall ? 'md' : 'lg'} src={collection.image} alt={collection.name} />
        <UiStack spacing={0}>
          <Text component={Link} to={`/collections/${collection.id}`} size={isSmall ? 'md' : 'xl'} weight={700}>
            {collection.name}
          </Text>
          {collection.publisher ? (
            <Text size={isSmall ? 'xs' : 'sm'} weight={500} color="dimmed">
              by {collection.publisher}
            </Text>
          ) : null}
        </UiStack>
      </Group>

      {children ? <Group sx={{ width: isSmall ? '150px' : undefined }}>{children}</Group> : null}
    </Stack>
  )
}
