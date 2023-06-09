import { Avatar, Group, Stack, Text } from '@mantine/core'
import { UiStack, useUiTheme } from '@pubkey-collections/web/ui/core'
import { Collection } from '@pubkeyapp/collections'
import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

export function CollectionHeader({ children, collection }: { children?: ReactNode; collection: Collection }) {
  const { isSmall } = useUiTheme()
  return (
    <Stack
      sx={{ flexDirection: isSmall ? 'column' : 'row' }}
      justify={isSmall ? 'stretch' : 'space-between'}
      align={'center'}
      spacing={isSmall ? 'xs' : 'md'}
    >
      <Group spacing="xs">
        <Avatar size="lg" src={collection.image} alt={collection.name} />
        <UiStack spacing={0}>
          <Text component={Link} to={`/collections/${collection.id}`} size="xl" weight={700}>
            {collection.name}
          </Text>
          {collection.publisher ? (
            <Text size="sm" weight={500} color="dimmed">
              by {collection.publisher}
            </Text>
          ) : null}
        </UiStack>
      </Group>
      {children}
    </Stack>
  )
}
