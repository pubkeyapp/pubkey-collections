import { Accordion, Avatar, Group, Text } from '@mantine/core'
import { Collection, CollectionTrait, CollectionTraitMap } from '@pubkey-collections/web/collection/data-access'
import { UiGroup } from '@pubkey-collections/web/ui/core'
import React from 'react'

import { CollectionTraitButton } from './collection-trait.button'
import styles from './web-collection-ui.module.css'

/* eslint-disable-next-line */
export interface WebCollectionUiProps {}

export function WebCollectionUi(props: WebCollectionUiProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to WebCollectionUi!</h1>
    </div>
  )
}

export default WebCollectionUi

export function CollectionHeader({ collection }: { collection: Collection }) {
  return (
    <UiGroup>
      <Group spacing="xs">
        <Avatar src={collection.image} alt={collection.name} />
        <Text size="xl" weight={700}>
          {collection.name}
        </Text>
        {collection.publisher ? (
          <Text size="sm" weight={500} color="dimmed">
            by {collection.publisher}
          </Text>
        ) : null}
      </Group>
    </UiGroup>
  )
}

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

export function CollectionTraitGroup({
  traits,
  selected,
  toggleTrait,
}: {
  traits: CollectionTrait[]
  selected?: CollectionTrait[]
  toggleTrait?: (trait: CollectionTrait) => void
}) {
  return (
    <Group>
      {traits.map((trait) => (
        <CollectionTraitButton
          trait={trait}
          toggleTrait={toggleTrait}
          selected={selected?.some((s) => s.key === trait.key && s.value === trait.value)}
          key={trait.value}
        />
      ))}
    </Group>
  )
}
