import { CollectionItem } from './collection-item'
import { CollectionTrait } from './collection-trait'

export interface CollectionCombo {
  name: string
  sortKey?: string
  traits: CollectionTrait[]
  items?: CollectionItem[]
}
