import { Badge } from '@mantine/core'
import { CollectionTrait } from '@pubkey-collections/web/collection/data-access'
import React from 'react'

export function CollectionTraitButton({
  trait,
  selected,
  toggleTrait,
}: {
  trait: CollectionTrait
  selected: boolean
  toggleTrait: (trait: CollectionTrait) => void
}) {
  return (
    <Badge
      sx={{ cursor: 'pointer' }}
      component={'button'}
      onClick={() => toggleTrait(trait)}
      variant={selected ? 'light' : 'outline'}
      size="sm"
      radius="sm"
    >
      {trait.value} ({trait.count})
    </Badge>
  )
}
