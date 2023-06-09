import { collections } from '../data'
import { Collection } from '../types'

export function findCollectionById(collectionId: string): Collection | undefined {
  return collections.find((collection) => collection.id === collectionId)
}
