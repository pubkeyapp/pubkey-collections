import { Button, Group, GroupProps, Menu } from '@mantine/core'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import React from 'react'

export function CollectionSort({ ...props }: GroupProps) {
  const { traitKeys: keys, setSortKey: select, sortKey: selected } = useCollection()

  return (
    <Group {...props}>
      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Button size="xs" variant="light">
            Sort
          </Button>
        </Menu.Target>
        <Menu.Dropdown>
          {keys.map((key) => (
            <Menu.Item key={key} onClick={() => select(key)} fw={selected === key ? 'bold' : 'normal'}>
              {key} {selected === key && '✓'}
            </Menu.Item>
          ))}
        </Menu.Dropdown>
      </Menu>
    </Group>
  )
}
