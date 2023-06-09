import { ApiAsset } from '../types'
import { findCollectionsByAccount } from './find-collections-by-account'

export function filterCollections(data: ApiAsset[]) {
  const withGrouping = data.filter((i) => i.grouping?.length)
  return withGrouping.filter((i) => i.grouping?.map((g) => g.group_value)?.some((a) => findCollectionsByAccount(a)))
}

export function filterCollection(data: ApiAsset[]) {
  const withGrouping = data.filter((i) => i.grouping?.length)

  return withGrouping.filter((i) => i.grouping?.map((g) => g.group_value)?.some((a) => findCollectionsByAccount(a)))
}
