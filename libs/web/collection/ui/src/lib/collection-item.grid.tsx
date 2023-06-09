import { SimpleGrid } from '@mantine/core'
import { UiCard } from '@pubkey-collections/web/ui/core'
import { CollectionItem } from '@pubkeyapp/collections'
import React from 'react'
import { CollectionItemImage } from './collection-item-image'

export function CollectionItemGrid({ items }: { items: CollectionItem[] }) {
  return (
    <SimpleGrid
      breakpoints={[
        { maxWidth: 'sm', cols: 3 },
        { minWidth: 'sm', cols: 3 },
        { minWidth: 'md', cols: 3 },
        { minWidth: 1200, cols: 6 },
        { minWidth: 1500, cols: 8 },
        { minWidth: 1800, cols: 10 },
        { minWidth: 2100, cols: 12 },
      ]}
    >
      {items.map((item) => (
        <UiCard key={item.id} p={0}>
          <CollectionItemImage item={item} />
        </UiCard>
      ))}
    </SimpleGrid>
  )
}
