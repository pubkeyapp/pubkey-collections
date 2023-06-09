import { Button, Group } from '@mantine/core'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { UiAlert, UiGroup, UiStack, useUiTheme } from '@pubkey-collections/web/ui/core'
import { sortCollectionItems } from '@pubkeyapp/collections'
import { useState } from 'react'

import { CollectionItemGrid } from './collection-item.grid'
import { CollectionMissingTraits } from './collection-missing-traits'
import { CollectionSelectedTraits } from './collection-selected-traits'
import { CollectionSort } from './collection-sort'
import { CollectionTraitSelector } from './collection-trait-selector'

export function CollectionTabGallery() {
  const { filteredItems, sortKey } = useCollection()
  const { isSmall } = useUiTheme()
  const [showSelector, setShowSelector] = useState(false)

  return (
    <UiStack>
      <UiGroup position={isSmall ? 'center' : 'apart'}>
        <CollectionSort position={isSmall ? 'center' : 'left'} />
        <Group>
          <CollectionMissingTraits />
          <Button size="xs" variant="light" onClick={() => setShowSelector(!showSelector)}>
            {showSelector ? 'Hide' : 'Show'} filters
          </Button>
        </Group>
      </UiGroup>

      {showSelector && <CollectionTraitSelector />}

      <Group>
        <CollectionSelectedTraits position={isSmall ? 'center' : 'apart'} />
      </Group>

      {filteredItems.length ? (
        <UiStack>
          <CollectionItemGrid items={sortCollectionItems(filteredItems, sortKey)} />
        </UiStack>
      ) : (
        <UiAlert message="No items found. Try to remove some filters or search for another wallet." />
      )}
    </UiStack>
  )
}
