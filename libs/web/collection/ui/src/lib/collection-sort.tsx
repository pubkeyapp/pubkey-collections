import { Badge, Group, GroupProps } from '@mantine/core'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import React from 'react'
import { CollectionSortButton } from './collection-sort-button'

export interface CollectionSortProps extends GroupProps {
  label?: string
}

export function CollectionSort({ label = 'Sort by', ...props }: CollectionSortProps) {
  const { traitKeys: keys, setSortKey: select, sortKey: selected } = useCollection()

  return (
    <Group {...props}>
      {label ? (
        <Badge variant="light" color="gray" size="sm" radius="sm">
          Sort by
        </Badge>
      ) : null}
      {keys.map((key) => (
        <CollectionSortButton key={key} label={key} select={(key) => select(key)} selected={selected === key} />
      ))}
    </Group>
  )
}
