import { CollectionTrait, CollectionTraitMap } from '../types'
import { countTraits } from './count-traits'
import { sortTraitsByCount } from './sort-traits-by-count'

export function createTraitMap(collectionTraitMap: CollectionTraitMap, traits: CollectionTrait[]): CollectionTraitMap {
  const counted = countTraits(traits)
  const merged = mergeTraits(collectionTraitMap, counted)
  const sorted = sortTraitsByCount(merged).sort((a, b) => a.key.localeCompare(b.key))

  return sorted.reduce((acc, trait) => {
    if (acc[trait.key]) {
      acc[trait.key].push(trait)
    } else {
      acc[trait.key] = [trait]
    }
    return acc
  }, {} as { [key: string]: CollectionTrait[] })
}

function mergeTraits(collectionTraitMap: CollectionTraitMap, traits: CollectionTrait[]): CollectionTrait[] {
  const collectionTraits = Object.keys(collectionTraitMap).flatMap((key) => collectionTraitMap[key])

  return collectionTraits.map((item) => {
    const found = traits.find((t) => t.key === item.key && t.value === item.value)
    if (found) {
      return found
    }
    return { ...item }
  })
}
