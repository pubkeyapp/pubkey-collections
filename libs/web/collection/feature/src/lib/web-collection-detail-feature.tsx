import { useCollectionDetail } from '@pubkey-collections/web/collection/data-access'
import { CollectionPage, CollectionPanel, CollectionSearch, RecentWallets } from '@pubkey-collections/web/collection/ui'
import { UiAlert, UiStack } from '@pubkey-collections/web/ui/core'
import React from 'react'
import { useParams } from 'react-router-dom'

export function WebCollectionDetail() {
  const { collectionId } = useParams() as { collectionId: string }
  const { collection, account, setAccount, wallet, loading } = useCollectionDetail(collectionId)

  if (!collection) {
    return <UiAlert title="Collection not found" message="Please check the URL" />
  }

  if (loading) {
    return <CollectionPanel collection={collection} loader title={`Looking up account ${account}`} />
  }

  if (account && wallet) {
    return <CollectionPage account={account} wallet={wallet} collection={collection} setAccount={setAccount} />
  }

  return (
    <CollectionPanel collection={collection} title={`Search for wallet address or name to see the collection`}>
      <UiStack spacing={64}>
        <CollectionSearch handleSearch={setAccount} value="" />
        <RecentWallets select={(wallet) => setAccount(wallet)} />
      </UiStack>
    </CollectionPanel>
  )
}
