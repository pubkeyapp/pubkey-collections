import { CollectionTraitMap } from '../types'

export function sortTraitMapByCount(traits: CollectionTraitMap = {}, groups: string[] = []): CollectionTraitMap {
  return Object.keys(traits)
    .filter((key) => groups.includes(key))
    .map((key) => traits[key])
    .sort((a, b) => {
      const countA = a[0]?.count ?? 0
      const countB = b[0]?.count ?? 0

      if (countA > countB) return -1
      if (countA < countB) return 1
      return 0
    })
    .reduce((acc, curr) => ({ ...acc, [curr[0]?.key]: curr }), {})
}
