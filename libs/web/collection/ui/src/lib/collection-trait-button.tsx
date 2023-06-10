import { Badge } from '@mantine/core'
import { MantineSize } from '@mantine/styles'
import { CollectionTrait } from '@pubkeyapp/collections'
import React from 'react'

export function CollectionTraitButton({
  withLabel,
  trait,
  size,
  selected,
  toggleTrait,
}: {
  withLabel?: boolean
  size: MantineSize
  trait: CollectionTrait
  selected?: boolean
  toggleTrait?: (trait: CollectionTrait) => void
}) {
  const count = trait.count ?? 0
  return (
    <Badge
      color={count > 0 || selected ? 'brand' : 'yellow'}
      sx={{ cursor: 'pointer' }}
      component={'button'}
      onClick={() => (toggleTrait ? toggleTrait(trait) : null)}
      variant={selected ? 'light' : count > 0 ? 'outline' : 'dot'}
      size={size ?? 'sm'}
      radius="sm"
    >
      {withLabel ? `${trait.key}: ` : null}
      {trait.value?.replace('|', ' OR ')} {trait.count ? `(${trait.count})` : null}
    </Badge>
  )
}
