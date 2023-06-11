import { Badge, Button, Group } from '@mantine/core'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { UiGroup, useUiTheme } from '@pubkey-collections/web/ui/core'
import React from 'react'
import { CollectionMissingTraits } from './collection-missing-traits'

export function CollectionSummary() {
  const { items, filteredItems, resetTraits } = useCollection()
  const { isSmall } = useUiTheme()
  const filtered = items.length > filteredItems.length
  return (
    <UiGroup position={isSmall ? 'center' : 'apart'}>
      <Group>
        <Badge>{filtered ? `${filteredItems.length} of ${items.length}` : `${items.length}`} items</Badge>
        {filtered ? (
          <Button size="xs" variant="subtle" onClick={() => resetTraits()}>
            Reset filters
          </Button>
        ) : null}
      </Group>
      <Group>
        <CollectionMissingTraits />
      </Group>
    </UiGroup>
  )
}
