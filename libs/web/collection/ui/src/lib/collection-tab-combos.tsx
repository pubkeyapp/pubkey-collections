import { Title } from '@mantine/core'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { UiAlert, UiCard, UiStack } from '@pubkey-collections/web/ui/core'
import { CollectionComboGroup, findItemsWithCombos } from '@pubkeyapp/collections'
import React, { useMemo } from 'react'
import { CollectionCombos } from './collection-combos'

const FIXME_accountCombos: { [key: string]: { [key: string]: CollectionComboGroup[] } } = {
  Dd1JSwojUsptwFa97A3WRZU1SijCWYo9Qa3xLxT8yzb7: {
    drip_the_faceless: [
      {
        name: 'Triplet',
        combos: [
          {
            name: 'Triplet 1',
            traits: [
              { key: 'Outfits', value: 'Blue Suir' },
              { key: 'Masks', value: 'Blue' },
              { key: 'Hoods', value: 'Black' },
              { key: 'Headwear', value: 'Big Brain Cap' },
            ],
          },
          {
            name: 'Triplet 2',
            traits: [
              { key: 'Outfits', value: 'Blue Suir' },
              { key: 'Masks', value: 'Blue' },
              { key: 'Hoods', value: 'Black' },
              { key: 'Headwear', value: 'Pirate' },
            ],
          },
          {
            name: 'Triplet 3',
            traits: [
              { key: 'Outfits', value: 'Hawain Shirt' },
              { key: 'Masks', value: 'Blue' },
              { key: 'Hoods', value: 'White' },
              { key: 'Headwear', value: 'Sombrero' },
            ],
          },
          {
            name: 'Triplet 4',
            traits: [
              { key: 'Outfits', value: 'Hawain Shirt' },
              { key: 'Masks', value: 'Blue' },
              { key: 'Hoods', value: 'White' },
              { key: 'Headwear', value: 'Blue Cap' },
            ],
          },
        ],
      },
      {
        name: 'Twins',
        combos: [
          {
            name: 'Orange McDegens',
            traits: [
              { key: 'Outfits', value: 'McDegens' },
              { key: 'Masks', value: 'Orange' },
              { key: 'Hoods', value: 'Orange' },
              { key: 'Headwear', value: 'McDegens' },
            ],
          },
          {
            name: 'Hawain Kings',
            traits: [
              { key: 'Outfits', value: 'Hawain Shirt' },
              { key: 'Masks', value: 'Blue' },
              { key: 'Hoods', value: 'White' },
              { key: 'Headwear', value: 'Crown' },
            ],
          },
          {
            name: 'Hawain Arrow',
            traits: [
              { key: 'Outfits', value: 'Hawain Shirt' },
              { key: 'Masks', value: 'Blue' },
              { key: 'Hoods', value: 'White' },
              { key: 'Headwear', value: 'Arrow' },
            ],
          },
          {
            name: 'Hawain Green Cap',
            traits: [
              { key: 'Outfits', value: 'Hawain Shirt' },
              { key: 'Masks', value: 'Blue' },
              { key: 'Hoods', value: 'White' },
              { key: 'Headwear', value: 'Green Cap' },
            ],
          },
          {
            name: 'Blue Suir Sombrero',
            traits: [
              { key: 'Outfits', value: 'Blue Suir' },
              { key: 'Masks', value: 'Blue' },
              { key: 'Hoods', value: 'Black' },
              { key: 'Headwear', value: 'Sombrero' },
            ],
          },
          {
            name: 'Blue Suir UFO',
            traits: [
              { key: 'Outfits', value: 'Blue Suir' },
              { key: 'Masks', value: 'Blue' },
              { key: 'Hoods', value: 'Black' },
              { key: 'Headwear', value: 'UFO' },
            ],
          },
          {
            name: 'Blue Suir Military',
            traits: [
              { key: 'Outfits', value: 'Blue Suir' },
              { key: 'Masks', value: 'Blue' },
              { key: 'Hoods', value: 'Black' },
              { key: 'Headwear', value: 'Military' },
            ],
          },
        ],
      },
      {
        name: 'Groups',
        combos: [
          {
            name: 'Black and Blue',
            traits: [
              { key: 'Outfits', value: 'Blue Suir' },
              { key: 'Masks', value: 'Blue' },
              { key: 'Hoods', value: 'Black' },
            ],
          },
          {
            name: 'Blue and White',
            traits: [
              { key: 'Outfits', value: 'Hawain Shirt' },
              { key: 'Masks', value: 'Blue' },
              { key: 'Hoods', value: 'White' },
            ],
          },
        ],
      },
    ],
  },
}

function getAccountCombos(collectionId: string, address?: string): CollectionComboGroup[] {
  return FIXME_accountCombos[address ?? '']?.[collectionId] ?? []
}

export function CollectionTabCombos() {
  const { collection, wallet, items } = useCollection()

  const accountComboGroups: CollectionComboGroup[] = useMemo(
    () => getAccountCombos(collection.id ?? '', wallet.address),
    [collection.id, wallet.address],
  )

  return collection?.comboGroups?.length ? (
    <UiStack>
      {collection.comboGroups.map((comboGroup) => (
        <CollectionCombosGroupItem group={comboGroup} key={comboGroup.name} />
      ))}
      {accountComboGroups?.length
        ? accountComboGroups.map((accountComboGroup) => (
            <CollectionCombosGroupItem group={accountComboGroup} key={accountComboGroup.name} />
          ))
        : null}
    </UiStack>
  ) : (
    <UiAlert message={`No combo groups found for ${collection?.name}`} />
  )
}

function CollectionCombosGroupItem({ group }: { group: CollectionComboGroup }) {
  const { collection, items } = useCollection()

  const collectionCombos = useMemo(() => findItemsWithCombos(group.combos, items), [group.combos, items])

  return (
    <UiCard>
      <UiStack key={group.name}>
        <Title order={3}>{group.name}</Title>
        {group.combos?.length ? (
          <CollectionCombos combos={collectionCombos ?? []} />
        ) : (
          <UiAlert message={`No combos found for ${collection?.name}`} />
        )}
      </UiStack>
    </UiCard>
  )
}
