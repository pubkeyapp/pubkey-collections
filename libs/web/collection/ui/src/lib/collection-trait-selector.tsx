import { Accordion, Group, Switch, Text } from '@mantine/core'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { UiGroup, UiSearchField, UiStack } from '@pubkey-collections/web/ui/core'
import { CollectionTraitMap } from '@pubkeyapp/collections'
import React, { useEffect, useMemo, useState } from 'react'
import { CollectionTraitGroup } from './collection-trait-group'

export function CollectionTraitSelector() {
  const { traits } = useCollection()
  const [checked, setChecked] = useState(false)
  const [search, setSearch] = useState<string>('')
  const [selected, setSelected] = useState<string[]>([])

  const keys = useMemo(() => Object.keys(traits), [traits])

  const filtered: CollectionTraitMap = useMemo(() => {
    if (!search) return traits
    return Object.keys(traits).reduce(
      (acc, key) => ({
        ...acc,
        [key]: traits[key].filter((trait) => trait.value.toLowerCase().includes(search.toLowerCase())),
      }),
      {},
    )
  }, [search, traits])

  useEffect(() => {
    setSelected(checked ? keys : [])
  }, [checked, keys])

  const filteredItems = useMemo(() => {
    return Object.keys(filtered).filter((key) => filtered[key].length > 0)
  }, [filtered])

  return (
    <UiStack>
      <UiGroup>
        <UiGroup>
          <UiSearchField setValue={setSearch} value={search} placeholder="Search traits" />
        </UiGroup>
        <UiGroup>
          <Switch label="Expand" checked={checked} onChange={(event) => setChecked(event.currentTarget.checked)} />
        </UiGroup>
      </UiGroup>
      {filteredItems?.length ? (
        <Accordion mb={0} variant="default" multiple value={selected} onChange={(value) => setSelected(value)}>
          {filteredItems.map((key) => (
            <Accordion.Item key={key} value={key}>
              <Accordion.Control>
                <Group align="center" spacing="xs">
                  <Text>{key}</Text>
                  <Text color="dimmed">({filtered[key].length})</Text>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <CollectionTraitGroup traits={filtered[key]} />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      ) : (
        <Text align={'center'} color="dimmed">
          No traits found
        </Text>
      )}
    </UiStack>
  )
}
