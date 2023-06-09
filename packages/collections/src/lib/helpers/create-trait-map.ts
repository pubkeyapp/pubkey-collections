import { CollectionTrait, CollectionTraitMap } from '../types'
import { countTraits } from './count-traits'
import { sortTraitsByCount } from './sort-traits-by-count'

export function createTraitMap(traits: CollectionTrait[]): CollectionTraitMap {
  return sortTraitsByCount(countTraits(traits))
    .sort((a, b) => a.key.localeCompare(b.key))
    .reduce((acc, trait) => {
      if (acc[trait.key]) {
        acc[trait.key].push(trait)
      } else {
        acc[trait.key] = [trait]
      }
      return acc
    }, {} as { [key: string]: CollectionTrait[] })
}
