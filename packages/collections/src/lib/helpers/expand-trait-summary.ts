import { CollectionTraitMap } from '../types/collection-trait-map'
import { CollectionTraitSummary } from '../types/collection-trait-summary'

export function expandTraitSummary(traits: CollectionTraitSummary): CollectionTraitMap {
  return Object.keys(traits).reduce((acc, key) => {
    acc[key] = traits[key].map((value) => ({
      key,
      value,
    }))
    return acc
  }, {} as CollectionTraitMap)
}
