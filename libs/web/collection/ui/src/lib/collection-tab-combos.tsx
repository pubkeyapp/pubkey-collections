import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { UiAlert, UiStack } from '@pubkey-collections/web/ui/core'
import { CollectionComboGroup } from '@pubkeyapp/collections'
import React, { useMemo } from 'react'
import { CollectionCombosGroupItem } from './collection-combos-group-item'
import { FIXME_accountCombos } from './fixme_account-combos'

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
