import { Badge } from '@mantine/core'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import React from 'react'
import { CollectionTraitGroup, CollectionTraitGroupProps } from './collection-trait-group'

export function CollectionSelectedTraits({ ...props }: Omit<CollectionTraitGroupProps, 'traits' | 'selected'>) {
  const { selectedTraits } = useCollection()
  return selectedTraits.length ? (
    <CollectionTraitGroup
      label={
        <Badge variant="light" color="gray" size="sm" radius="sm">
          Filtered by
        </Badge>
      }
      {...props}
      withLabel
      traits={selectedTraits}
      selected={selectedTraits}
    />
  ) : null
}
