import { Box } from '@mantine/core'
import { CollectionSet, CollectionTrait, parseAssets } from '@pubkey-collections/web/collection/data-access'
import {
  CollectionHeader,
  CollectionItemGrid,
  CollectionTraitGroup,
  CollectionTraitGroups,
} from '@pubkey-collections/web/collection/ui'
import { useSolana } from '@pubkey-collections/web/shell/data-access'
import { UiAlert, UiCard, UiDebug, UiLoader, UiSearchField, UiStack } from '@pubkey-collections/web/ui/core'
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

export function WebCollectionDetail() {
  const [publicKey, setPublicKey] = useState('Dd1JSwojUsptwFa97A3WRZU1SijCWYo9Qa3xLxT8yzb7')
  const { collectionId } = useParams() as { collectionId: string }

  const isValid = useMemo(() => isValidSolanaPublicKey(publicKey), [publicKey])
  const [loading, setLoading] = useState(false)
  const [selectedTraits, setSelectedTraits] = useState<CollectionTrait[]>([])
  const [collectionSet, setCollectionSet] = useState<CollectionSet | undefined>(undefined)

  const { connection } = useSolana()

  const handleSearch = () => {
    if (!isValid) return
    setLoading(true)
    connection.getAssetsByOwner({ ownerAddress: publicKey }).then((res) => {
      setLoading(false)
      setCollectionSet(parseAssets(res.items).find((c) => c.collection.id === collectionId))
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

  const { collection, items, traits } = collectionSet || { collection: undefined, items: [] }

  const filtered = useMemo(() => {
    if (!selectedTraits.length) return items

    return items.filter((item) => {
      const found = item.traits.find((t) => {
        return selectedTraits.find((st) => st.key === t.key && st.value === t.value)
      })

      return !!found
    })
  }, [items, selectedTraits])

  if (loading) {
    return <UiLoader />
  }
  if (!collection) {
    return <UiAlert title="Collection not found" message="Please check the URL" />
  }

  return (
    <UiStack>
      <UiSearchField value={publicKey} setValue={setPublicKey} onSearch={handleSearch} />
      <UiStack key={collection.id}>
        <UiCard>
          <CollectionHeader collection={collection} />
        </UiCard>
        <UiStack>
          <CollectionTraitGroups traits={traits} selected={selectedTraits} toggleTrait={toggleTrait} />
          {selectedTraits.length ? (
            <Box p="xs">
              <CollectionTraitGroup traits={selectedTraits} selected={selectedTraits} toggleTrait={toggleTrait} />
            </Box>
          ) : null}
        </UiStack>

        <CollectionItemGrid items={filtered} />
      </UiStack>
    </UiStack>
  )
}
