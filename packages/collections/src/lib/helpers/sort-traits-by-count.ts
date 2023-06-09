import { CollectionTrait } from '../types'

export function sortTraitsByCount(traits: CollectionTrait[]): CollectionTrait[] {
  return traits.sort((a, b) => (b.count ?? 0) - (a.count ?? 0))
}
