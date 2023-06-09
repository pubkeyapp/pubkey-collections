import { Badge } from '@mantine/core'
import React from 'react'

export function CollectionSortButton({
  label,
  selected,
  select,
}: {
  label: string
  selected?: boolean
  select?: (key: string) => void
}) {
  return (
    <Badge
      sx={{ cursor: 'pointer' }}
      component={'button'}
      onClick={() => (select ? select(label) : null)}
      variant={selected ? 'light' : 'outline'}
      size="sm"
      radius="sm"
    >
      {label}
    </Badge>
  )
}
