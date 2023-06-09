import { Group, Image } from '@mantine/core'
import { CollectionItem } from '@pubkeyapp/collections'

export function CollectionItemGroup({ items, width }: { items: CollectionItem[]; width?: number }) {
  return (
    <Group>
      {items.map((item) => (
        <Image key={item.id} src={item.image} alt={item.name} width={width} />
      ))}
    </Group>
  )
}
