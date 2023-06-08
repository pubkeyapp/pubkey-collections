import { CollectionSet, CollectionTrait, parseAssets } from '@pubkey-collections/web/collection/data-access'
import {
  CollectionHeader,
  CollectionItemGrid,
  CollectionTraitGroup,
  CollectionTraitGroups,
} from '@pubkey-collections/web/collection/ui'
import { useSolana } from '@pubkey-collections/web/shell/data-access'
import {
  UiAlert,
  UiCard,
  UiContainer,
  UiDebug,
  UiLoader,
  UiPageHeader,
  UiSearchField,
  UiStack,
} from '@pubkey-collections/web/ui/core'
import { PublicKey } from '@solana/web3.js'
import React, { useMemo, useState } from 'react'

function isValidSolanaPublicKey(publicKey: string): boolean {
  try {
    new PublicKey(publicKey)
    return true
  } catch (_) {
    return false
  }
}

export function WebDevFeature() {
  const [publicKey, setPublicKey] = useState('Dd1JSwojUsptwFa97A3WRZU1SijCWYo9Qa3xLxT8yzb7')
  const isValid = useMemo(() => isValidSolanaPublicKey(publicKey), [publicKey])
  const [loading, setLoading] = useState(false)
  const [selectedTraits, setSelectedTraits] = useState<CollectionTrait[]>([])
  const [collectionSet, setCollectionSet] = useState<CollectionSet[] | undefined>(undefined)

  const { connection } = useSolana()

  const handleSearch = () => {
    if (!isValid) return

    setLoading(true)
    connection.getAssetsByOwner({ ownerAddress: publicKey }).then((res) => {
      setLoading(false)
      setCollectionSet(parseAssets(res.items))
    })
  }

  const toggleTrait = (trait: CollectionTrait) => {
    if (selectedTraits.includes(trait)) {
      setSelectedTraits(selectedTraits.filter((t) => t !== trait))
    } else {
      setSelectedTraits([...selectedTraits, trait])
    }
  }
  return (
    <UiContainer>
      <UiStack>
        <UiPageHeader title={`Development`} />
        <UiSearchField value={publicKey} setValue={setPublicKey} onSearch={handleSearch} />

        {loading ? (
          <UiLoader />
        ) : collectionSet?.length ? (
          <UiStack>
            {collectionSet.map(({ collection, items, traits, count }) => (
              <UiStack key={collection.id}>
                <UiCard>
                  <CollectionHeader collection={collection} />
                </UiCard>
                <UiCard>
                  <CollectionTraitGroups traits={traits} selected={selectedTraits} toggleTrait={toggleTrait} />
                </UiCard>
                <UiCard>
                  <CollectionTraitGroup traits={selectedTraits} selected={selectedTraits} toggleTrait={toggleTrait} />
                </UiCard>
                <UiDebug data={selectedTraits} open />
                <CollectionItemGrid items={items} />
              </UiStack>
            ))}
          </UiStack>
        ) : (
          <UiAlert message="No items loaded" />
        )}

        <UiCard>
          <UiDebug data={{ isValid, loading, publicKey, collectionSet }} />
        </UiCard>
      </UiStack>
    </UiContainer>
  )
}
