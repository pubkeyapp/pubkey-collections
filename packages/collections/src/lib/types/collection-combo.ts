import { CollectionItem } from './collection-item'
import { CollectionTrait } from './collection-trait'

export interface CollectionCombo {
  id: string
  name?: string
  links?: Links
  group?: boolean
  sortKey?: string
  common?: number
  traits: CollectionTrait[]
  items?: CollectionItem[]
}

export interface Links {
  homepage?: string
  discord?: string
  twitter?: string
}
