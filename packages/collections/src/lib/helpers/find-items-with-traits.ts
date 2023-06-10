import { CollectionItem, CollectionTrait } from '../types'

export function findItemsWithTraits(items: CollectionItem[], traits: CollectionTrait[]): CollectionItem[] {
  const result: CollectionItem[] = []

  for (const item of items) {
    const hasAllTraits = traits.every((trait) =>
      item.traits.find((t) => {
        const values = trait.value?.split('|').map((v) => v.trim()) ?? [trait.value]
        return t.key === trait.key && values.includes(t.value)
      }),
    )

    if (hasAllTraits) {
      result.push(item)
    }
  }

  return result
}
