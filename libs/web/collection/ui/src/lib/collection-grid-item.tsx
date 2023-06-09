import { Group, Image, Text } from '@mantine/core'
import { UiCard } from '@pubkey-collections/web/ui/core'
import { Collection } from '@pubkeyapp/collections'

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
