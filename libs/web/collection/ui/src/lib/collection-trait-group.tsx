import { Group, GroupProps } from '@mantine/core'
import { CollectionTrait } from '@pubkeyapp/collections'
import React from 'react'
import { CollectionTraitButton } from './collection-trait.button'

export interface CollectionTraitGroupProps extends GroupProps {
  withLabel?: boolean
  traits: CollectionTrait[]
  selected?: CollectionTrait[]
  toggleTrait?: (trait: CollectionTrait) => void
}

export function CollectionTraitGroup({
  withLabel = false,
  traits,
  selected,
  toggleTrait,
  ...props
}: CollectionTraitGroupProps) {
  return (
    <Group {...props}>
      {traits.map((trait) => (
        <CollectionTraitButton
          withLabel={withLabel}
          trait={trait}
          toggleTrait={toggleTrait}
          selected={selected?.some((s) => s.key === trait.key && s.value === trait.value)}
          key={trait.key + ':' + trait.value}
        />
      ))}
    </Group>
  )
}
