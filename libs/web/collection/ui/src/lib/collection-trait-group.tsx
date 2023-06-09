import { Button, Group, GroupProps, SimpleGrid, SimpleGridProps } from '@mantine/core'
import { MantineSize } from '@mantine/styles'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { CollectionTrait, sortTraitsByCount } from '@pubkeyapp/collections'
import React, { ReactNode } from 'react'
import { CollectionTraitButton } from './collection-trait-button'

export interface CollectionTraitGroupProps extends GroupProps {
  withLabel?: boolean
  buttonSize?: MantineSize
  traits: CollectionTrait[]
  selected?: CollectionTrait[]
  label?: ReactNode
}

export function CollectionTraitGroup({
  label,
  withLabel = false,
  traits,
  buttonSize = 'sm',
  selected,
  ...props
}: CollectionTraitGroupProps) {
  const { toggleTrait } = useCollection()

  return (
    <Group {...props}>
      {label}
      {sortTraitsByCount(traits).map((trait) => (
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

export interface CollectionTraitGridProps extends SimpleGridProps {
  withLabel?: boolean
  buttonSize?: MantineSize
  traits: CollectionTrait[]
  selected?: CollectionTrait[]
  label?: ReactNode
}

export function CollectionTraitGrid({
  label,
  withLabel = false,
  traits,
  buttonSize = 'sm',
  selected,
  ...props
}: CollectionTraitGridProps) {
  const { toggleTrait } = useCollection()

  return (
    <SimpleGrid {...props} cols={2}>
      {label}
      {sortTraitsByCount(traits).map((trait) => (
        <CollectionTraitGridItem
          size={buttonSize}
          withLabel={withLabel}
          trait={trait}
          toggleTrait={toggleTrait}
          selected={selected?.some((s) => s.key === trait.key && s.value === trait.value)}
          key={trait.key + ':' + trait.value}
        />
      ))}
    </SimpleGrid>
  )
}

export function CollectionTraitGridItem({
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
  return (
    <Button
      sx={{ cursor: 'pointer' }}
      component={'button'}
      onClick={() => (toggleTrait ? toggleTrait(trait) : null)}
      variant={selected ? 'light' : 'outline'}
      size={size ?? 'sm'}
      radius="sm"
    >
      {withLabel ? `${trait.key}: ` : null}
      {trait.value} {trait.count ? `(${trait.count})` : null}
    </Button>
  )
}
