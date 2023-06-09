import { CollectionTrait } from '../types'

export function sortTraitsByCount(traits: CollectionTrait[]): CollectionTrait[] {
  return traits.sort((a, b) => (a.count && b.count ? b.count - a.count : 0))
}
