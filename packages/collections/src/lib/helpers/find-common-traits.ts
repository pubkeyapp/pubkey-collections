import { CollectionCombo, CollectionItem, CollectionTrait } from '../types'
import { findItemsWithTraits } from './find-items-with-traits'

function findTraitValues(traits: CollectionTrait[], keys: string[]): string[] {
  return keys.map((key) => traits.find((trait) => trait.key === key)?.value ?? '')
}

function findTraitName(traits: CollectionTrait[]): string {
  return traits.reduce((acc, trait) => {
    const tag = trait.value
    if (acc === '') {
      return tag
    }

    return `${acc}, ${tag}`
  }, '')
}

export function findCommonTraits(
  items: CollectionItem[] = [],
  keys: string[] = [],
  minCommonTraits = 2,
): CollectionCombo[] {
  const result: CollectionCombo[] = []

  for (const item of items) {
    // Get all the other items
    const others = items.filter((other) => other !== item)

    // Check for each of the other items if they have common traits with the current item
    const commonTraits = others
      .map((other) => compareCollectionTraitArrays(keys, item.traits, other.traits))
      .filter((item) => item.length > 1)

    // Loop over the common traits and add them to the result counter
    for (const commonTrait of commonTraits) {
      const name = findTraitName(commonTrait)
      const count = commonTrait.length

      if (!result.find((trait) => trait.name === name && trait.common === count)) {
        result.push({
          name: name,
          common: count,
          traits: commonTrait,
          items: [],
        })
      }
    }
  }

  const foundItems: CollectionItem[] = []

  // Now, loop over the result and add the items to the result
  for (const item of result.sort((a, b) => (b.traits?.length ?? 0) - (a.traits?.length ?? 0))) {
    const found = findItemsWithTraits(items, item.traits).filter((item) => !foundItems.includes(item))

    foundItems.push(...found)
    item.items = found
  }

  return (
    result
      // Filter out the combos that have only one trait
      .filter((item) => (item.traits?.length ?? 0) >= minCommonTraits)
      // Filter out the combos that have only one item
      .filter((item) => (item.items?.length ?? 0) > 1)
  )
}

function compareTwoTraitArrays(a: string[], b: string[]): string[] {
  // The array of common traits
  const result: string[] = []

  // Loop through the first array
  for (const item of a) {
    // If the item is in the second array add it to the result
    result.push(b.includes(item) ? item : '')
  }

  return result
}

function compareCollectionTraitArrays(keys: string[], a: CollectionTrait[], b: CollectionTrait[]): CollectionTrait[] {
  const filteredA = a.filter((trait) => keys.includes(trait.key))
  const filteredB = b.filter((trait) => keys.includes(trait.key))
  const compared = compareTwoTraitArrays(findTraitValues(filteredA, keys), findTraitValues(filteredB, keys))

  return compared
    .map((value, i) => (value !== '' ? filteredA[i] : undefined))
    .filter((trait): trait is CollectionTrait => !!trait)
}
