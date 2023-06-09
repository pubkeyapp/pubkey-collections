import { CollectionTrait, CollectionTraitMap } from '../types'

export function findMissingTraits(collection: CollectionTraitMap, user: CollectionTraitMap): CollectionTrait[] {
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
