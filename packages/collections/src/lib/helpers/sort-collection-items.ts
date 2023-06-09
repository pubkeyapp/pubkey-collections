import { CollectionItem } from '../types'

export function sortCollectionItems(items: CollectionItem[], traitKey?: string): CollectionItem[] {
  if (!traitKey) return [...items]
  return items.sort((a, b) => {
    const traitA = a.traits.find((t) => t.key === traitKey)?.value
    const traitB = b.traits.find((t) => t.key === traitKey)?.value
    if (traitA && traitB) {
      return traitA.localeCompare(traitB)
    }
    return 0
  })
}
