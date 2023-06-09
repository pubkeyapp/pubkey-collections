import { useSolana } from '@pubkey-collections/web/shell/data-access'
import { Collection, processApiAssets } from '@pubkeyapp/collections'
import { useQuery } from '@tanstack/react-query'

export function useCollectionItems({ address, collection }: { address: string; collection: Collection }) {
  const { connection } = useSolana()

  return useQuery({
    queryKey: ['collection', collection.id, 'items', address],
    queryFn: () => {
      return connection.getAssetsByOwner({ ownerAddress: address }).then((res) => {
        return processApiAssets(collection, res.items)
      })
    },
  })
}
