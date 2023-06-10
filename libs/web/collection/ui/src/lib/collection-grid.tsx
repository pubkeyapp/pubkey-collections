import { Anchor, Group, SimpleGrid } from '@mantine/core'
import { useRecentWallets } from '@pubkey-collections/web/collection/data-access'
import { UiStack } from '@pubkey-collections/web/ui/core'
import { Collection } from '@pubkeyapp/collections'
import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CollectionGridItem } from './collection-grid-item'

export function CollectionGrid({ items }: { items: Collection[] }) {
  const sorted = useMemo(() => items.sort((a, b) => a.name.localeCompare(b.name)), [items])
  const { recentWallets } = useRecentWallets()
  return (
    <SimpleGrid
      breakpoints={[
        { maxWidth: 'sm', cols: 2 },
        { minWidth: 'sm', cols: sorted?.length < 4 ? 2 : 3 },
      ]}
    >
      {sorted.map((item) => (
        <UiStack key={item.id}>
          <Anchor component={Link} underline={false} to={item.id}>
            <CollectionGridItem item={item} />
          </Anchor>
          <Group spacing="xs" align="center">
            {recentWallets.map((wallet) => (
              <Anchor
                size="xs"
                variant="subtle"
                key={wallet}
                component={Link}
                to={`/collections/${item.id}?q=${wallet}`}
              >
                {wallet}
              </Anchor>
            ))}
          </Group>
        </UiStack>
      ))}
    </SimpleGrid>
  )
}
