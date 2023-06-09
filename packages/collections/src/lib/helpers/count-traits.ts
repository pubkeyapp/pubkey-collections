import { CollectionTrait } from '../types'

export function countTraits(traits: CollectionTrait[]): CollectionTrait[] {
  return traits.reduce((acc, trait) => {
    const existing = acc.find((t) => t.key === trait.key && t.value === trait.value)
    if (existing) {
      existing.count = existing.count ? existing.count + 1 : 2
    } else {
      acc.push({ ...trait, count: 1 })
    }
    return acc
  }, [] as CollectionTrait[])
}
