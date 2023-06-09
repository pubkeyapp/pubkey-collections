import { Group } from '@mantine/core'
import { CollectionItem } from '@pubkeyapp/collections'
import { CollectionItemImage } from './collection-item-image'

export function CollectionItemGroup({ items, width }: { items: CollectionItem[]; width?: number }) {
  return (
    <Group>
      {items.map((item) => (
        <CollectionItemImage key={item.id} item={item} width={width} />
      ))}
    </Group>
  )
}
