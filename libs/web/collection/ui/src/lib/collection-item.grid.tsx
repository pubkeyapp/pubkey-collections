import { Group, Image, SimpleGrid, Text } from '@mantine/core'
import { CollectionItem } from '@pubkey-collections/web/collection/data-access'
import { UiCard } from '@pubkey-collections/web/ui/core'
import React from 'react'

export function CollectionItemGrid({ items }: { items: CollectionItem[] }) {
  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: 'sm', cols: 2 },
        { minWidth: 'md', cols: 3 },
        { minWidth: 1200, cols: 6 },
      ]}
    >
      {items.map((item) => (
        <UiCard key={item.id} p={0}>
          <Image src={item.image} alt={item.name} />
          <Group p="xs" position="center">
            <Text size="xs">{item.name}</Text>
          </Group>
        </UiCard>
      ))}
    </SimpleGrid>
  )
}
