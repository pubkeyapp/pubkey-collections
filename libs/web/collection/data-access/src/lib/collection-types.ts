export interface CollectionTraitMap {
  [key: string]: CollectionTrait[]
}
export interface CollectionTrait {
  key: string
  value: string
  count?: number
}

export interface CollectionItem {
  id: string
  name: string
  description?: string
  image?: string
  collection?: Collection
  traits: CollectionTrait[]
}

export interface CollectionSet {
  count: number
  collection: Collection
  items: CollectionItem[]
  traits: CollectionTraitMap
}

export interface Collection {
  id: string
  compressed: boolean
  name: string
  image: string
  publisher: string
  accounts: string[]
}
