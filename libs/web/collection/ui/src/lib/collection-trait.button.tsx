import { Badge } from '@mantine/core'
import { CollectionTrait } from '@pubkeyapp/collections'
import React from 'react'

export function CollectionTraitButton({
  withLabel,
  trait,
  selected,
  toggleTrait,
}: {
  withLabel?: boolean
  trait: CollectionTrait
  selected?: boolean
  toggleTrait?: (trait: CollectionTrait) => void
}) {
  return (
    <Badge
      sx={{ cursor: 'pointer' }}
      component={'button'}
      onClick={() => (toggleTrait ? toggleTrait(trait) : null)}
      variant={selected ? 'light' : 'outline'}
      size="sm"
      radius="sm"
    >
      {withLabel ? `${trait.key}: ` : null}
      {trait.value} {trait.count ? `(${trait.count})` : null}
    </Badge>
  )
}
