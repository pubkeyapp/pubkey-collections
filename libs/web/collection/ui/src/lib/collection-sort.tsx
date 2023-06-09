import { Group } from '@mantine/core'
import React from 'react'
import { CollectionSortButton } from './collection-sort-button'

export function CollectionSort({
  keys,
  selected,
  select,
}: {
  keys: string[]
  selected?: string
  select?: (trait: string) => void
}) {
  return (
    <Group>
      {keys.map((key) => (
        <CollectionSortButton key={key} label={key} select={select} selected={selected === key} />
      ))}
    </Group>
  )
}
