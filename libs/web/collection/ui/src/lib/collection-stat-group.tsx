import { Box, Text } from '@mantine/core'
import { UiStack } from '@pubkey-collections/web/ui/core'
import { CollectionStatGroup as StatGroup } from '@pubkeyapp/collections'
import { CollectionStatItem } from './collection-stat-item'

export function CollectionStatGroup({ group }: { group: StatGroup }) {
  return (
    <Box key={group.key} p="md">
      <UiStack spacing={4}>
        <Text size="lg">{group.key}</Text>
        {group.items.map((item, index) => (
          <CollectionStatItem key={item.value} item={item} index={index} />
        ))}
      </UiStack>
    </Box>
  )
}
