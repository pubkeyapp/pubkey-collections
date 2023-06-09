import { CollectionTrait, CollectionTraitMap } from '../types'

export function findMissingTraits(collection: CollectionTraitMap, user: CollectionTraitMap): CollectionTrait[] {
  return Object.keys(collection)
    .map((key) => collection[key])
    .reduce(
      (acc, traitValues) => [
        ...acc,
        ...traitValues.filter((value) => {
          const found = user[value.key]?.find((t) => t.value === value.value)

          return !found || (found.count ?? 0) < 1
        }),
      ],
      [],
    )
}
