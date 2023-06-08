import { Anchor, Group, Image, SimpleGrid, Text } from '@mantine/core'
import { Collection } from '@pubkey-collections/web/collection/data-access'
import { UiCard } from '@pubkey-collections/web/ui/core'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'

export function CollectionGrid({ items, link }: { items: Collection[]; link?: boolean }) {
  const sorted = useMemo(() => items.sort((a, b) => a.name.localeCompare(b.name)), [items])

  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: 'sm', cols: 2 },
        { minWidth: 'md', cols: 3 },
        { minWidth: 1200, cols: 6 },
      ]}
    >
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

export function CollectionGridItem({ item }: { item: Collection }) {
  return (
    <UiCard p={0}>
      <Image src={item.image} alt={item.name} />
      <Group position="apart" p="md">
        <Text size="xl" weight={700}>
          {item.name}
        </Text>
        {item.publisher ? (
          <Text size="sm" weight={500} color="dimmed">
            by {item.publisher}
          </Text>
        ) : null}
      </Group>
    </UiCard>
  )
}
