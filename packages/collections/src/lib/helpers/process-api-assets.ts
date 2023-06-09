import { ApiAsset, Collection, CollectionSet } from '../types'
import { createTraitMap } from './create-trait-map'
import { filterCollection } from './filter-collections'
import { itemSummary } from './item-summary'

export function processApiAssets(collection: Collection, data: ApiAsset[]): CollectionSet {
  const filtered = filterCollection(data)
    .map((item) => itemSummary(item))
    .filter((i) => i.collectionId === collection.id)

  return processCollectionSet({
    collection,
    traits: {},
    traitKeys: [],
    items: filtered,
  })
}

export function processCollectionSet(set: CollectionSet): CollectionSet {
  set.items = set.items.sort((a, b) => a.name.localeCompare(b.name))
  set.traits = createTraitMap(
    set.collection.traits,
    set.items.flatMap((a) => a.traits),
  )
  set.traitKeys = Object.keys(set.traits).sort((a, b) => a.localeCompare(b))
  return set
}
