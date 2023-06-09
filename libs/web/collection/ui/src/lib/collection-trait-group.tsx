import { Group, GroupProps } from '@mantine/core'
import { MantineSize } from '@mantine/styles'
import { CollectionTrait } from '@pubkeyapp/collections'
import React from 'react'
import { CollectionTraitButton } from './collection-trait.button'

export interface CollectionTraitGroupProps extends GroupProps {
  withLabel?: boolean
  buttonSize?: MantineSize
  traits: CollectionTrait[]
  selected?: CollectionTrait[]
  toggleTrait?: (trait: CollectionTrait) => void
}

export function CollectionTraitGroup({
  withLabel = false,
  traits,
  buttonSize = 'sm',
  selected,
  toggleTrait,
  ...props
}: CollectionTraitGroupProps) {
  return (
    <Group {...props}>
      {traits.map((trait) => (
        <CollectionTraitButton
          size={buttonSize}
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
