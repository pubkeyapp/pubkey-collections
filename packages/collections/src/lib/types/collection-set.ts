import { Collection } from './collection'
import { CollectionItem } from './collection-item'
import { CollectionTraitMap } from './collection-trait-map'

export interface CollectionSet {
  collection: Collection
  items: CollectionItem[]
  traits: CollectionTraitMap
}
