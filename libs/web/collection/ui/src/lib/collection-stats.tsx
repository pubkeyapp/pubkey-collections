import { Box, SimpleGrid } from '@mantine/core'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { CollectionStatGroup } from './collection-stat-group'

export function CollectionStats() {
  const { statGroups } = useCollection()

  return (
    <SimpleGrid
      breakpoints={[
        { minWidth: 'xs', cols: 1 },
        { minWidth: 'sm', cols: 2 },
        { minWidth: 'md', cols: 3 },
        { minWidth: 'xl', cols: 6 },
      ]}
    >
      {statGroups
        .sort((a, b) => a.key.localeCompare(b.key))
        .map((group) => (
          <Box key={group.key}>
            <CollectionStatGroup group={group} />
          </Box>
        ))}
    </SimpleGrid>
  )
}
