import { Box, Title } from '@mantine/core'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { UiAlert, UiStack } from '@pubkey-collections/web/ui/core'
import { CollectionComboGroup, findItemsWithCombos } from '@pubkeyapp/collections'
import React, { useMemo } from 'react'
import { CollectionCombos } from './collection-combos'

export function CollectionCombosGroupItem({ group }: { group: CollectionComboGroup }) {
  const { collection, items } = useCollection()

  const collectionCombos = useMemo(() => {
    const hasItems = group.combos?.every((combo) => combo.items?.length)
    return hasItems ? group.combos : findItemsWithCombos(group.combos, items)
  }, [group.combos, items])

  return (
    <Box p="md">
      <UiStack key={group.name}>
        <Title align="center" order={3}>
          {group.name}
        </Title>
        {group.combos?.length ? (
          <CollectionCombos combos={collectionCombos ?? []} />
        ) : (
          <UiAlert message={`No combos found for ${collection?.name}`} />
        )}
      </UiStack>
    </Box>
  )
}
