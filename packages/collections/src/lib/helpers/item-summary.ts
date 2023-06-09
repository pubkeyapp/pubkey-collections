import { ApiAsset, CollectionItem, CollectionTrait } from '../types'
import { findCollectionsByAccount } from './find-collections-by-account'

export function itemSummary(item: ApiAsset): CollectionItem {
  const files = (item.content as unknown as { files: { uri: string; cdn_uri: string; mime: string }[] })?.files ?? []
  const image = files.find((f) => f.mime.startsWith('image/'))
  const collection = findCollectionsByAccount(item.grouping?.[0].group_value)
  const traits =
    item.content.metadata?.attributes
      ?.filter((a) => a.trait_type && a.value)
      .map((a) => ({ key: a.trait_type, value: a.value } as CollectionTrait)) ?? []

  return {
    id: item.id,
    name: item.content.metadata?.name ?? item.id,
    description: item.content.metadata?.description,
    collectionId: collection?.id ?? '',
    image: image?.cdn_uri,
    traits: traits ?? [],
  }
}
