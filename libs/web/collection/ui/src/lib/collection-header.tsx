import { Avatar, Group, Text } from '@mantine/core'
import { UiGroup } from '@pubkey-collections/web/ui/core'
import { Collection } from '@pubkeyapp/collections'
import React from 'react'

export function CollectionHeader({ collection }: { collection: Collection }) {
  return (
    <UiGroup>
      <Group spacing="xs">
        <Avatar src={collection.image} alt={collection.name} />
        <Text size="xl" weight={700}>
          {collection.name}
        </Text>
        {collection.publisher ? (
          <Text size="sm" weight={500} color="dimmed">
            by {collection.publisher}
          </Text>
        ) : null}
      </Group>
    </UiGroup>
  )
}
