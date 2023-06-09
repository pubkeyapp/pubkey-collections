import { collections } from '../data'
import { Collection } from '../types'

export function findCollectionsByAccount(account: string): Collection | undefined {
  return collections.find((collection) => collection.accounts.includes(account))
}
