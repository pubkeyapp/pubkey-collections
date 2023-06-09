import { Box, Image } from '@mantine/core'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { UiStack } from '@pubkey-collections/web/ui/core'
import { CollectionItem } from '@pubkeyapp/collections'
import { CollectionTraitGrid } from './collection-trait-group'

export function CollectionItemCard({ item }: { item: CollectionItem }) {
  const { selectedTraits } = useCollection()
  return (
    <UiStack pb="md">
      <Image key={item.id} src={item.image} alt={item.name} />
      <Box px="xs">
        <CollectionTraitGrid traits={item.traits} selected={selectedTraits} withLabel />
      </Box>
    </UiStack>
  )
}
