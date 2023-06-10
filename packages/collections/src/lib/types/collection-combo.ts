import { CollectionItem } from './collection-item'
import { CollectionTrait } from './collection-trait'

export interface CollectionCombo {
  name: string
  group?: boolean
  sortKey?: string
  common?: number
  traits: CollectionTrait[]
  items?: CollectionItem[]
}

export interface CollectionComboGroup {
  name: string
  combos: CollectionCombo[]
}
