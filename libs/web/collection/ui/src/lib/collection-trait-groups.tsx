import { Accordion } from '@mantine/core'
import { CollectionTrait, CollectionTraitMap } from '@pubkeyapp/collections'
import React from 'react'
import { CollectionTraitGroup } from './collection-trait-group'

export function CollectionTraitGroups({
  traits,
  selected,
  toggleTrait,
}: {
  traits: CollectionTraitMap
  selected: CollectionTrait[]
  toggleTrait: (trait: CollectionTrait) => void
}) {
  return (
    <Accordion mb={0} variant="contained" multiple>
      {Object.keys(traits).map((key) => (
        <Accordion.Item key={key} value={key}>
          <Accordion.Control>{key}</Accordion.Control>
          <Accordion.Panel>
            <CollectionTraitGroup traits={traits[key]} toggleTrait={toggleTrait} selected={selected} />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
