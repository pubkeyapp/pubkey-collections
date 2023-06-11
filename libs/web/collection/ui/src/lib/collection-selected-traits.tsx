import { Badge } from '@mantine/core'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { UiGroup, useUiTheme } from '@pubkey-collections/web/ui/core'
import React from 'react'
import { CollectionTraitGroup } from './collection-trait-group'

export function CollectionSelectedTraits() {
  const { selectedTraits } = useCollection()
  const { isSmall } = useUiTheme()
  return selectedTraits.length ? (
    <UiGroup position={isSmall ? 'center' : 'apart'}>
      <CollectionTraitGroup
        label={
          <Badge variant="light" color="gray" size="sm" radius="sm">
            Filtered by
          </Badge>
        }
        position={isSmall ? 'center' : 'apart'}
        withLabel
        traits={selectedTraits}
        selected={selectedTraits}
      />
    </UiGroup>
  ) : null
}
