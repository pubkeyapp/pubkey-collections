import {
  Collection,
  CollectionItem,
  CollectionSet,
  CollectionTrait,
  CollectionTraitMap,
  CollectionWallet,
  findItemsWithTraits,
  findMissingTraits,
  sortTraitMapByCount,
} from '@pubkeyapp/collections'
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react'

export interface CollectionProviderContext {
  account: string
  collection: Collection
  collectionSet: CollectionSet
  items: CollectionItem[]
  filteredItems: CollectionItem[]
  missingTraits: CollectionTrait[]
  selectedTraits: CollectionTrait[]
  setSortKey: (key: string | undefined) => void
  sortKey: string | undefined
  stats: CollectionTraitMap
  toggleTrait: (trait: CollectionTrait) => void
  traitKeys: string[]
  traits: CollectionTraitMap
  wallet: CollectionWallet
}

const CollectionContext = createContext<CollectionProviderContext>({} as CollectionProviderContext)

export function CollectionProvider({
  account,
  children,
  collectionSet,
  wallet,
}: {
  account: string
  children: ReactNode
  collectionSet: CollectionSet
  wallet: CollectionWallet
}) {
  const [selectedTraits, setSelectedTraits] = useState<CollectionTrait[]>([])
  const [sortKey, setSortKey] = useState<string | undefined>(undefined)

  const collection = useMemo(() => collectionSet.collection, [collectionSet.collection])
  const items = useMemo(() => collectionSet.items ?? [], [collectionSet.items])
  const traitKeys = useMemo(() => collectionSet.traitKeys ?? [], [collectionSet.traitKeys])
  const traits = useMemo(() => collectionSet.traits ?? {}, [collectionSet.traits])
  const stats = useMemo(() => sortTraitMapByCount(traits, collection?.traitStats), [collection?.traitStats, traits])
  const filteredItems = useMemo(() => findItemsWithTraits(items, selectedTraits), [items, selectedTraits])
  const missingTraits: CollectionTrait[] = useMemo(
    () => findMissingTraits(collection?.traits ?? {}, traits ?? {}),
    [collection, traits],
  )

  const toggleTrait = (trait: CollectionTrait) => {
    const found = selectedTraits.find((t) => t.key === trait.key && t.value === trait.value)
    if (found) {
      setSelectedTraits((s) => s.filter((t) => t.key !== trait.key || t.value !== trait.value))
    } else {
      setSelectedTraits([...selectedTraits, trait])
    }
  }

  useEffect(() => {
    if (traitKeys.length && !sortKey) {
      setSortKey(traitKeys[0])
    }
  }, [traitKeys, sortKey])

  const value: CollectionProviderContext = {
    account,
    collection,
    collectionSet,
    items,
    filteredItems,
    missingTraits,
    selectedTraits,
    sortKey,
    stats,
    setSortKey,
    toggleTrait,
    traitKeys,
    traits,
    wallet,
  }
  return <CollectionContext.Provider value={value}>{children}</CollectionContext.Provider>
}

export const useCollection = () => useContext(CollectionContext)
