import { ApiAsset, Collection, CollectionSet } from '../types'
import { createTraitMap } from './create-trait-map'
import { filterCollection, filterCollections } from './filter-collections'
import { findCollectionById } from './find-collection-by-id'
import { itemSummary } from './item-summary'

export function parseApiAssets(data: ApiAsset[]): CollectionSet[] {
  const filtered = filterCollections(data).map((item) => itemSummary(item))

  return (
    filtered
      // Make sure we have a collectionId
      .filter((i) => i.collectionId)
      .reduce((acc, asset) => {
        const collection = findCollectionById(asset.collectionId)
        if (!collection) {
          return acc
        }

        const found = acc.find((c) => c.collection.id === asset.collectionId)
        if (found) {
          found.items.push(asset)
        } else {
          acc.push({
            collection,
            traits: {},
            items: [asset],
          })
        }
        return acc
      }, [] as CollectionSet[])
      .map(processCollectionSet)
  )
}

export function processApiAssets(collection: Collection, data: ApiAsset[]): CollectionSet {
  const filtered = filterCollection(data)
    .map((item) => itemSummary(item))
    .filter((i) => i.collectionId === collection.id)

  return processCollectionSet({
    collection,
    traits: {},
    items: filtered,
  })
}

export function processCollectionSet(set: CollectionSet): CollectionSet {
  set.items = set.items.sort((a, b) => a.name.localeCompare(b.name))
  set.traits = createTraitMap(set.items.flatMap((a) => a.traits))
  return set
}
