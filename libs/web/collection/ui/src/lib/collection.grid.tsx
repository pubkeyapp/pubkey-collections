import { Anchor, SimpleGrid } from '@mantine/core'
import { Collection } from '@pubkeyapp/collections'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { CollectionGridItem } from './collection-grid-item'

export function CollectionGrid({ items, link }: { items: Collection[]; link?: boolean }) {
  const sorted = useMemo(() => items.sort((a, b) => a.name.localeCompare(b.name)), [items])

  return (
    <SimpleGrid breakpoints={[{ minWidth: 'sm', cols: sorted?.length < 4 ? 2 : 3 }]}>
      {sorted.map((item) =>
        link ? (
          <Anchor component={Link} underline={false} to={item.id} key={item.id}>
            <CollectionGridItem item={item} />
          </Anchor>
        ) : (
          <CollectionGridItem item={item} key={item.id} />
        ),
      )}
    </SimpleGrid>
  )
}
