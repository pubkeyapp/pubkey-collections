import { useSolana } from '@pubkey-collections/web/shell/data-access'
import { Collection, processApiAssets } from '@pubkeyapp/collections'
import { useQuery } from '@tanstack/react-query'

export function useCollectionItems({ address, collection }: { address: string; collection: Collection }) {
  const { connection } = useSolana()

  return useQuery({
    queryKey: ['collection', collection.id, 'items', address],
    queryFn: () => connection.getAllAssetsByOwner(address).then((res) => processApiAssets(collection, res)),
    // One minute cache
    cacheTime: 60 * 1000,
  })
}
