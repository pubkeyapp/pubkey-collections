import { Avatar, Group, Stack } from '@mantine/core'
import { CollectionProvider, useCollectionItems } from '@pubkey-collections/web/collection/data-access'
import { ellipsify, UiAlert } from '@pubkey-collections/web/ui/core'
import { Collection, CollectionWallet } from '@pubkeyapp/collections'
import React from 'react'
import { CollectionHeader } from './collection-header'

import { CollectionPanel } from './collection-panel'
import { CollectionSearch } from './collection-search'
import { CollectionSummary } from './collection-summary'
import { CollectionTabs } from './collection-tabs'

export function CollectionPage({
  account,
  collection,
  setAccount,
  wallet,
}: {
  account: string
  collection: Collection
  setAccount: (q: string) => void
  wallet: CollectionWallet
}) {
  const query = useCollectionItems({ address: wallet?.address as string, collection })

  if (!collection) {
    return <UiAlert title="Collection not found" message="Please check the URL" />
  }

  if (query.isLoading) {
    return <CollectionPanel collection={collection} loader title={`Loading collection for ${ellipsify(account)}...`} />
  }

  if (!query.data) {
    return (
      <CollectionPanel collection={collection} title={`No items found for ${account}`}>
        <CollectionSearch handleSearch={setAccount} value={account} />
      </CollectionPanel>
    )
  }

  return (
    <CollectionProvider account={account} collectionSet={query.data} wallet={wallet}>
      <Stack>
        <CollectionHeader collection={collection}>
          <Group>
            {wallet?.picture ? <Avatar size="lg" src={wallet?.picture} /> : null}
            <CollectionSearch handleSearch={setAccount} value={account} />
          </Group>
        </CollectionHeader>
        <CollectionSummary />
        <CollectionTabs />
      </Stack>
    </CollectionProvider>
  )
}
