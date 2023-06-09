import { Box, Tabs, Title } from '@mantine/core'
import {
  CollectionCombos,
  CollectionHeader,
  CollectionItemGrid,
  CollectionSort,
  CollectionTraitGroup,
  CollectionTraitGroups,
} from '@pubkey-collections/web/collection/ui'
import { useSolana } from '@pubkey-collections/web/shell/data-access'
import { UiAlert, UiCard, UiDebugModal, UiLoader, UiSearchField, UiStack } from '@pubkey-collections/web/ui/core'
import {
  ApiAsset,
  CollectionCombo,
  CollectionSet,
  CollectionTrait,
  findCollectionById,
  findItemsWithCombos,
  findItemsWithTraits,
  findMissingTraits,
  processApiAssets,
  sortCollectionItems,
} from '@pubkeyapp/collections'
import { PublicKey } from '@solana/web3.js'
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

function isValidSolanaPublicKey(publicKey: string): boolean {
  try {
    new PublicKey(publicKey)
    return true
  } catch (_) {
    return false
  }
}

const FIXME_accountCombos: { [key: string]: CollectionCombo[] } = {
  Dd1JSwojUsptwFa97A3WRZU1SijCWYo9Qa3xLxT8yzb7: [
    {
      name: 'Black and Blue',
      traits: [
        { key: 'Outfits', value: 'Blue Suir' },
        { key: 'Masks', value: 'Blue' },
        { key: 'Hoods', value: 'Black' },
      ],
      sortKey: 'Headwear',
    },
    {
      name: 'Black and Skull',
      traits: [
        { key: 'Outfits', value: 'Police' },
        { key: 'Masks', value: 'Blue' },
        { key: 'Hoods', value: 'Black' },
      ],
    },
  ],
}

export function WebCollectionDetail() {
  const [publicKey, setPublicKey] = useState('Dd1JSwojUsptwFa97A3WRZU1SijCWYo9Qa3xLxT8yzb7')
  const [sortKey, setSortKey] = useState<string | undefined>(undefined)
  const { collectionId } = useParams() as { collectionId: string }
  const collection = findCollectionById(collectionId)
  const isValid = useMemo(() => isValidSolanaPublicKey(publicKey), [publicKey])
  const [loading, setLoading] = useState(false)
  const [selectedTraits, setSelectedTraits] = useState<CollectionTrait[]>([])
  const [collectionSet, setCollectionSet] = useState<CollectionSet | undefined>(undefined)
  const { connection } = useSolana()

  const handleSearch = () => {
    if (!isValid || !collection) return
    setLoading(true)
    connection.getAssetsByOwner({ ownerAddress: publicKey }).then((res) => {
      setLoading(false)
      setCollectionSet(processApiAssets(collection, res.items as unknown as ApiAsset[]))
    })
  }

  useEffect(() => {
    handleSearch()
  }, [])

  const toggleTrait = (trait: CollectionTrait) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits((s) => s.filter((t) => t.key !== trait.key || t.value !== trait.value))
    } else {
      setSelectedTraits([...selectedTraits, trait])
    }
  }

  const { items, traits } = collectionSet || { collection: undefined, items: [] }

  const filtered = useMemo(() => findItemsWithTraits(items, selectedTraits), [items, selectedTraits])
  const missing = useMemo(() => findMissingTraits(collection?.traits ?? {}, traits ?? {}), [collection, traits])

  // FIXME: this is a hack to show combos for a specific account
  const accountCombos: CollectionCombo[] = useMemo(
    () => (publicKey ? FIXME_accountCombos[publicKey] ?? [] : []),
    [publicKey],
  )

  const accountComboData = useMemo(() => findItemsWithCombos(accountCombos, items), [accountCombos, items])
  const collectionCombos = useMemo(() => findItemsWithCombos(collection?.combos, items), [collection?.combos, items])

  const collectionTraitKeys = useMemo(() => {
    return Object.keys(collection?.traits ?? {}).map((key) => key)
  }, [collection?.traits])

  useEffect(() => {
    if (collectionTraitKeys.length && !sortKey) {
      setSortKey(collectionTraitKeys[0])
    }
  }, [collectionTraitKeys, sortKey])

  if (loading) {
    return <UiLoader />
  }
  if (!collection) {
    return <UiAlert title="Collection not found" message="Please check the URL" />
  }

  if (!traits) {
    return <UiAlert title="No traits found" message="Please check the URL and account" />
  }

  return (
    <UiStack>
      <UiSearchField value={publicKey} setValue={setPublicKey} onSearch={handleSearch} />
      <UiStack key={collection.id}>
        <UiCard>
          <CollectionHeader collection={collection} />
        </UiCard>

        <Tabs defaultValue="gallery">
          <Tabs.List>
            <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
            <Tabs.Tab value="combos">Combos</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="gallery" pt="xs">
            <UiStack>
              <CollectionTraitGroups traits={traits} selected={selectedTraits} toggleTrait={toggleTrait} />
              {selectedTraits.length ? (
                <Box p="xs">
                  <CollectionTraitGroup
                    withLabel
                    traits={selectedTraits}
                    selected={selectedTraits}
                    toggleTrait={toggleTrait}
                  />
                </Box>
              ) : null}
              {missing.length ? (
                <Box p="xs">
                  <Title order={3}>Missing traits</Title>
                  <CollectionTraitGroup traits={missing} />
                </Box>
              ) : null}

              <CollectionSortKeys keys={collectionTraitKeys} selected={sortKey} select={(key) => setSortKey(key)} />
              <CollectionItemGrid items={sortCollectionItems(filtered, sortKey)} />
            </UiStack>
            <UiDebugModal data={filtered} />
          </Tabs.Panel>

          <Tabs.Panel value="combos" pt="xs">
            {collection.combos?.length ? (
              <UiStack>
                <Title order={3}>Collection Combos</Title>
                <CollectionCombos combos={collectionCombos ?? []} />
                <Title order={3}>Account Combos</Title>
                <CollectionCombos combos={accountComboData ?? []} />
              </UiStack>
            ) : (
              <UiDebugModal data={collection} />
            )}
          </Tabs.Panel>
        </Tabs>
      </UiStack>
    </UiStack>
  )
}

function CollectionSortKeys({
  keys,
  selected,
  select,
}: {
  keys: string[]
  selected: string | undefined
  select: (key: string) => void
}) {
  return (
    <UiStack>
      <Title order={3}>Sort by</Title>
      <CollectionSort keys={keys} selected={selected} select={select} />
    </UiStack>
  )
}
