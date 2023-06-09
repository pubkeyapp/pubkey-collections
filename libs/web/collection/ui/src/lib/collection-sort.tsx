import { Badge, Group, GroupProps } from '@mantine/core'
import React from 'react'
import { CollectionSortButton } from './collection-sort-button'

export interface CollectionSortProps extends GroupProps {
  label?: string
  keys: string[]
  selected?: string
  select?: (trait: string) => void
}

export function CollectionSort({ label = 'Sort by', keys, selected, select, ...props }: CollectionSortProps) {
  return (
    <Group {...props}>
      {label ? (
        <Badge variant="light" color="gray" size="sm" radius="sm">
          Sort by
        </Badge>
      ) : null}
      {keys.map((key) => (
        <CollectionSortButton key={key} label={key} select={select} selected={selected === key} />
      ))}
    </Group>
  )
}
