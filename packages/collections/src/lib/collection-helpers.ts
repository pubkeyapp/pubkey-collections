import { ReadApiAsset } from '@metaplex-foundation/js'
import { collections } from './collection-registry'
import { Collection, CollectionItem, CollectionSet, CollectionTrait, CollectionTraitMap } from './collection-types'

export function getCollectionByAccount(account: string): Collection | undefined {
  return collections.find((collection) => collection.accounts.includes(account))
}

export function filterCollections(data: ReadApiAsset[]) {
  const withGrouping = data.filter((i) => i.grouping?.length)
  return withGrouping.filter((i) => i.grouping?.map((g) => g.group_value)?.some((a) => getCollectionByAccount(a)))
}

export function parseAssets(data: ReadApiAsset[]): CollectionSet[] {
  const filtered = filterCollections(data).map((item) => itemSummary(item))
  return filtered
    .filter((i) => i.collection)
    .reduce((acc, asset) => {
      const collection = acc.find((c) => c.collection.id === asset.collection?.id)
      if (collection) {
        collection.items.push(asset)
      } else {
        acc.push({
          collection: asset.collection as Collection,
          count: 0,
          traits: {},
          items: [asset],
        })
      }
      return acc
    }, [] as CollectionSet[])
    .map((set) => {
      set.items = set.items.sort((a, b) => a.name.localeCompare(b.name))
      set.count = set.items.length
      set.traits = traitMap(set.items.flatMap((a) => a.traits))
      return set
    })
}

export function traitMap(traits: CollectionTrait[]): CollectionTraitMap {
  return sortTraits(countTraits(traits))
    .sort((a, b) => a.key.localeCompare(b.key))
    .reduce((acc, trait) => {
      if (acc[trait.key]) {
        acc[trait.key].push(trait)
      } else {
        acc[trait.key] = [trait]
      }
      return acc
    }, {} as { [key: string]: CollectionTrait[] })
}

export function countTraits(traits: CollectionTrait[]): CollectionTrait[] {
  return traits.reduce((acc, trait) => {
    const existing = acc.find((t) => t.key === trait.key && t.value === trait.value)
    if (existing) {
      existing.count = existing.count ? existing.count + 1 : 2
    } else {
      acc.push({ ...trait, count: 1 })
    }
    return acc
  }, [] as CollectionTrait[])
}

export function sortTraits(traits: CollectionTrait[]): CollectionTrait[] {
  return traits.sort((a, b) => {
    if (a.count && b.count) {
      return b.count - a.count
    }
    return a.key.localeCompare(b.key)
  })
}

export function itemSummary(item: ReadApiAsset): CollectionItem {
  const files = (item.content as unknown as { files: { uri: string; cdn_uri: string; mime: string }[] })?.files ?? []
  const image = files.find((f) => f.mime.startsWith('image/'))
  const collection = getCollectionByAccount(item.grouping?.[0].group_value)
  const traits =
    item.content.metadata?.attributes
      ?.filter((a) => a.trait_type && a.value)
      .map((a) => ({ key: a.trait_type, value: a.value } as CollectionTrait)) ?? []

  return {
    id: item.id,
    name: item.content.metadata?.name ?? item.id,
    description: item.content.metadata?.description,
    collection,
    image: image?.cdn_uri,
    traits: traits ?? [],
  }
}

export function expandTraits(traits: { [key: string]: string[] }): CollectionTraitMap {
  return Object.keys(traits).reduce((acc, key) => {
    acc[key] = traits[key].map((value) => ({
      key,
      value,
    }))
    return acc
  }, {} as CollectionTraitMap)
}

export function traitSummary(input?: CollectionTraitMap): { groups: number; traits: number } {
  const traitMap = input ?? {}
  const groups = Object.keys(traitMap).length
  const traits = Object.keys(traitMap).reduce((acc, key) => acc + traitMap[key].length, 0)

  return { groups, traits }
}

export function missingTraits(collection: CollectionTraitMap, user: CollectionTraitMap): CollectionTrait[] {
  return Object.keys(collection)
    .map((key) => collection[key])
    .reduce(
      (acc, traitValues) => [
        ...acc,
        ...traitValues.filter((value) => !user[value.key]?.find((t) => t.value === value.value)),
      ],
      [],
    )
}
