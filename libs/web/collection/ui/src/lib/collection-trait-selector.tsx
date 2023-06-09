import { Accordion } from '@mantine/core'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import React from 'react'
import { CollectionTraitGroup } from './collection-trait-group'

export function CollectionTraitSelector() {
  const { traits } = useCollection()
  return (
    <Accordion mb={0} variant="contained" multiple>
      {Object.keys(traits).map((key) => (
        <Accordion.Item key={key} value={key}>
          <Accordion.Control>{key}</Accordion.Control>
          <Accordion.Panel>
            <CollectionTraitGroup traits={traits[key]} />
          </Accordion.Panel>
        </Accordion.Item>
      ))}
    </Accordion>
  )
}
