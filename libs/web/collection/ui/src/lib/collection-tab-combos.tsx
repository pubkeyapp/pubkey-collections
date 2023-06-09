import { Title } from '@mantine/core'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { UiAlert, UiStack } from '@pubkey-collections/web/ui/core'
import { CollectionCombo, findItemsWithCombos } from '@pubkeyapp/collections'
import React, { useMemo } from 'react'
import { CollectionCombos } from './collection-combos'

const FIXME_accountCombos: { [key: string]: CollectionCombo[] } = {
  Dd1JSwojUsptwFa97A3WRZU1SijCWYo9Qa3xLxT8yzb7: [
    {
      name: 'Black and Blue',
      traits: [
        { key: 'Outfits', value: 'Blue Suir' },
        { key: 'Masks', value: 'Blue' },
        { key: 'Hoods', value: 'Black' },
      ],
      sortKey: 'Headwear',
    },
    {
      name: 'White and Blue',
      traits: [
        { key: 'Outfits', value: 'Hawain Shirt' },
        { key: 'Masks', value: 'Blue' },
        { key: 'Hoods', value: 'White' },
      ],
      sortKey: 'Headwear',
    },
    {
      name: 'Black and Skull',
      traits: [
        { key: 'Outfits', value: 'Police' },
        { key: 'Masks', value: 'Blue' },
        { key: 'Hoods', value: 'Black' },
      ],
      sortKey: 'Backgrounds',
    },
  ],
}

export function CollectionTabCombos() {
  const { collection, items, wallet } = useCollection()
  // FIXME: this is a hack to show combos for a specific account
  const accountCombos: CollectionCombo[] = useMemo(
    () => (wallet?.address ? FIXME_accountCombos[wallet.address] ?? [] : []),
    [wallet?.address],
  )

  const accountComboData = useMemo(() => findItemsWithCombos(accountCombos, items), [accountCombos, items])
  const collectionCombos = useMemo(() => findItemsWithCombos(collection?.combos, items), [collection?.combos, items])

  return collection?.combos?.length ? (
    <UiStack>
      <Title order={3}>Collection Combos</Title>
      <CollectionCombos combos={collectionCombos ?? []} />
      {accountComboData?.length ? (
        <UiStack>
          <Title order={3}>Account Combos</Title>
          <CollectionCombos combos={accountComboData ?? []} />
        </UiStack>
      ) : null}
    </UiStack>
  ) : (
    <UiAlert message={`No combos found for ${collection?.name}`} />
  )
}
