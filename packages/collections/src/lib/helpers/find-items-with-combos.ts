import { findItemsWithTraits, sortCollectionItems } from '../helpers'
import { CollectionCombo, CollectionItem } from '../types'

export function findItemsWithCombos(
  combos: CollectionCombo[] | undefined,
  items: CollectionItem[] | undefined,
): CollectionCombo[] {
  return (
    combos?.map((combo) => ({
      ...combo,
      items: sortCollectionItems(findItemsWithTraits(items ?? [], combo.traits ?? []), combo.sortKey) ?? [],
    })) ?? []
  )
}
