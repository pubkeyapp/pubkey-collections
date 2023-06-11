import { Anchor, SimpleGrid } from '@mantine/core'
import { UiStack } from '@pubkey-collections/web/ui/core'
import { Collection } from '@pubkeyapp/collections'
import React, { useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CollectionGridItem } from './collection-grid-item'
import { RecentWallets } from './recent-wallets'

export function CollectionGrid({ items }: { items: Collection[] }) {
  const sorted = useMemo(() => items.sort((a, b) => a.name.localeCompare(b.name)), [items])
  const navigate = useNavigate()
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
          <RecentWallets select={(wallet) => navigate(`/collections/${item.id}?q=${wallet}`)} />
        </UiStack>
      ))}
    </SimpleGrid>
  )
}
