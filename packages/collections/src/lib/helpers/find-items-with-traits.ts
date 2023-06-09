import { CollectionItem, CollectionTrait } from '../types'

export function findItemsWithTraits(items: CollectionItem[], traits: CollectionTrait[]): CollectionItem[] {
  const result: CollectionItem[] = []

  for (const item of items) {
    const hasAllTraits = traits.every((trait) =>
      item.traits.find((t) => t.key === trait.key && t.value === trait.value),
    )

    if (hasAllTraits) {
      result.push(item)
    }
  }

  return result
}
