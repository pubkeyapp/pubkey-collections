import { Avatar, Box, Group, Progress, Tabs, Title } from '@mantine/core'
import {
  CollectionCombos,
  CollectionHeader,
  CollectionItemGrid,
  CollectionSort,
  CollectionSortKeys,
  CollectionStats,
  CollectionTraitGroup,
  CollectionTraitGroups,
} from '@pubkey-collections/web/collection/ui'
import { useSolana } from '@pubkey-collections/web/shell/data-access'
import {
  walletNameToAddressAndProfilePicture,
  walletAddressToNameAndProfilePicture,
} from '@portal-payments/solana-wallet-names'
import { UiAlert, UiCard, UiDebugModal, UiLoader, UiSearchField, UiStack } from '@pubkey-collections/web/ui/core'
import {
  CollectionCombo,
  CollectionSet,
  CollectionTrait,
  findCollectionById,
  findItemsWithCombos,
  findItemsWithTraits,
  findMissingTraits,
  processApiAssets,
  sortCollectionItems,
  sortTraitMapByCount,
} from '@pubkeyapp/collections'
import { Connection, PublicKey } from '@solana/web3.js'
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

export interface Wallet {
  picture?: string
  address?: string
}

async function fetchPublicKey(connection: Connection, query: string): Promise<Wallet | undefined> {
  const extensions = ['.abc', '.backpack', '.bonk', '.glow', '.sol', '.ottr', '.poor']
  const hasExtension = extensions.some((ext) => query.endsWith(ext))

  if (hasExtension) {
    const res = await walletNameToAddressAndProfilePicture(connection, query)
    return { picture: res.profilePicture ?? undefined, address: res.walletAddress ?? undefined }
  } else {
    isValidSolanaPublicKey(query)
    const res = await walletAddressToNameAndProfilePicture(connection, new PublicKey(query))
    return { picture: res.profilePicture ?? undefined, address: res.walletName ?? undefined }
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
      name: 'White and Blue',
      traits: [
        { key: 'Outfits', value: 'Hawain Shirt' },
        { key: 'Masks', value: 'Blue' },
        { key: 'Hoods', value: 'White' },
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
      sortKey: 'Backgrounds',
    },
  ],
}

export function WebCollectionDetail() {
  const [searchQuery, setSearchQuery] = useState('beeman.sol')
  const [wallet, setWallet] = useState<Wallet | undefined>(undefined)
  const [sortKey, setSortKey] = useState<string | undefined>(undefined)
  const { collectionId } = useParams() as { collectionId: string }
  const collection = findCollectionById(collectionId)
  const [loading, setLoading] = useState(false)
  const [selectedTraits, setSelectedTraits] = useState<CollectionTrait[]>([])
  const [collectionSet, setCollectionSet] = useState<CollectionSet | undefined>(undefined)
  const { connection } = useSolana()

  const handleSearch = () => {
    if (!collection || !searchQuery) return
    setCollectionSet(undefined)
    setWallet(undefined)
    setSelectedTraits([])
    setLoading(true)
    fetchPublicKey(connection, searchQuery)
      .then((res) => {
        const address = res?.address ?? searchQuery
        setWallet({ picture: res?.picture, address })

        return connection.getAssetsByOwner({ ownerAddress: address })
      })
      .then((res) => {
        setCollectionSet(processApiAssets(collection, res.items))
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
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
    () => (wallet?.address ? FIXME_accountCombos[wallet.address] ?? [] : []),
    [wallet?.address],
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

  const stats = useMemo(() => sortTraitMapByCount(traits, collection?.traitStats), [collection?.traitStats, traits])

  if (!collection) {
    return <UiAlert title="Collection not found" message="Please check the URL" />
  }

  return (
    <UiStack>
      <UiStack key={collection.id}>
        <UiCard>
          <CollectionHeader collection={collection}>
            <Group>
              {wallet?.picture ? <Avatar size="lg" src={wallet?.picture} /> : null}
              <UiSearchField size="lg" value={searchQuery} setValue={setSearchQuery} onSearch={handleSearch} />
            </Group>
          </CollectionHeader>
        </UiCard>

        {loading ? (
          <UiLoader />
        ) : wallet?.address ? (
          items.length ? (
            <Tabs defaultValue="gallery">
              <Tabs.List>
                <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
                <Tabs.Tab value="combos">Combos</Tabs.Tab>
                <Tabs.Tab value="stats">Stats</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="gallery" pt="xs">
                <UiStack>
                  {traits ? (
                    <CollectionTraitGroups traits={traits} selected={selectedTraits} toggleTrait={toggleTrait} />
                  ) : null}
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
                      <CollectionTraitGroup traits={missing} withLabel />
                    </Box>
                  ) : null}

                  <CollectionSortKeys keys={collectionTraitKeys} selected={sortKey} select={(key) => setSortKey(key)} />
                  <CollectionItemGrid items={sortCollectionItems(filtered, sortKey)} toggleTrait={toggleTrait} />
                </UiStack>
                <UiDebugModal data={filtered} />
              </Tabs.Panel>

              <Tabs.Panel value="combos" pt="xs">
                {collection.combos?.length ? (
                  <UiStack>
                    <Title order={3}>Collection Combos</Title>
                    <CollectionCombos combos={collectionCombos ?? []} />
                    <Title order={3}>Account Combos</Title>
                    {accountComboData?.length ? (
                      <CollectionCombos combos={accountComboData ?? []} />
                    ) : (
                      <UiAlert message={`No combos found for ${wallet?.address}`} />
                    )}
                  </UiStack>
                ) : (
                  <UiAlert message={`No combos found for ${collection.name}`} />
                )}
              </Tabs.Panel>

              <Tabs.Panel value="stats" pt="xs">
                <UiStack>
                  <CollectionStats stats={stats} />
                </UiStack>
              </Tabs.Panel>
            </Tabs>
          ) : (
            <UiAlert message={`No items found for ${collection.name} and ${wallet?.address}`} />
          )
        ) : (
          <UiAlert message={`No wallet found for ${searchQuery}`} />
        )}
      </UiStack>
    </UiStack>
  )
}
