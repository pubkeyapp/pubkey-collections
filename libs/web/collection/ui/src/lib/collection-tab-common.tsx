import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { UiAlert, UiStack } from '@pubkey-collections/web/ui/core'
import { CollectionComboGroup, findCommonTraits } from '@pubkeyapp/collections'
import React, { useMemo } from 'react'
import { CollectionCombosGroupItem } from './collection-combos-group-item'

export function CollectionTabCommon() {
  const { collection, items } = useCollection()

  const collectionComboGroups: CollectionComboGroup[] = useMemo(() => {
    const combos = findCommonTraits(items, collection.traitGroups)
      .sort((a, b) => (b.items?.length ?? 0) - (a.items?.length ?? 0))
      .sort((a, b) => b.traits.length - a.traits.length)

    const groups: CollectionComboGroup[] = []
    combos.forEach((combo) => {
      const countTraits = combo.traits?.length ?? 0
      const countItems = combo.items?.length ?? 0
      const groupName = `${countTraits} traits - ${countItems} items`

      // We get the group with the same number of traits or create a new one
      const theGroup = groups.find((group) => group.name === groupName) ?? { name: groupName, combos: [] }

      // We add the combo to the group combos list
      theGroup.combos?.push(combo)

      // We add the group to the groups list
      if (!groups.find((group) => group.name === groupName)) {
        groups.push(theGroup)
      }
    })

    return groups
  }, [items, collection.traitGroups])

  return (
    <UiStack>
      {collectionComboGroups?.length ? (
        collectionComboGroups.map((collectionComboGroup) => (
          <CollectionCombosGroupItem group={collectionComboGroup} key={collectionComboGroup.name} />
        ))
      ) : (
        <UiAlert message={`No common groups found for ${collection?.name}`} />
      )}
    </UiStack>
  )
}
