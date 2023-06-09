import { CollectionTrait } from './collection-trait'

export interface CollectionItem {
  id: string
  name: string
  description?: string
  image?: string
  collectionId: string
  traits: CollectionTrait[]
}
