import { useCollectionWallet } from '@pubkey-collections/web/collection/data-access'
import { UiAlert } from '@pubkey-collections/web/ui/core'
import { Collection } from '@pubkeyapp/collections'
import { CollectionPage } from './collection-page'
import { CollectionPanel } from './collection-panel'

export function CollectionWalletLoader({
  account,
  collection,
  setAccount,
}: {
  account: string
  collection: Collection
  setAccount: (q: string) => void
}) {
  const q = useCollectionWallet({ account })

  if (q.isLoading) {
    return <CollectionPanel collection={collection} loader title={`Looking up wallet ${account}`} />
  }

  if (!q.data) {
    return (
      <CollectionPanel collection={collection} title={`Wallet ${account} not found`}>
        <UiAlert title="Wallet not found" message="Please check the URL" />
      </CollectionPanel>
    )
  }

  return <CollectionPage account={account} wallet={q.data} collection={collection} setAccount={setAccount} />
}
