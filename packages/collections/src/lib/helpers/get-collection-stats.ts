import { CollectionTraitMap } from '../types'
import { CollectionStatGroup } from '../types/collection-stat-group'

export function getCollectionStats(traits: CollectionTraitMap): CollectionStatGroup[] {
  return Object.keys(traits)
    .map((key) => ({ key, stats: traits[key] }))
    .filter((group) => group.stats.length > 1)
    .map((group) => {
      const total = group.stats.reduce((acc, cur) => acc + (cur.count ?? 0), 0)
      const items = group.stats.map((stat) => ({
        value: stat.value,
        percent: ((stat.count ?? 0) / total) * 100,
      }))
      return {
        key: group.key,
        items,
      }
    })
}
