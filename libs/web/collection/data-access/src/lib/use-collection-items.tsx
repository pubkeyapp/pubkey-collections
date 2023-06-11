import { ReadApiAssetList, useSolana, WrappedConnection } from '@pubkey-collections/web/shell/data-access'
import { ApiAsset, Collection, processApiAssets } from '@pubkeyapp/collections'
import { useQuery } from '@tanstack/react-query'

export function useCollectionItems({ address, collection }: { address: string; collection: Collection }) {
  const { connection } = useSolana()

  return useQuery({
    queryKey: ['collection', collection.id, 'items', address],
    queryFn: () => getAllItems(connection, address).then((res) => processApiAssets(collection, res)),
    // One minute cache
    cacheTime: 60 * 1000,
  })
}

async function getAllItems(connection: WrappedConnection, address: string): Promise<ApiAsset[]> {
  const result: ApiAsset[] = []

  // If a user has more than 1000 items, we need to make multiple requests to get all of them
  const firstPage = await getItemsPerPage(connection, address, 1)
  const totalItems = firstPage.total

  console.log(`getAllItems for ${address} has ${firstPage.items.length} items and ${totalItems} pages`)
  result.push(...firstPage.items)

  let loadMore = firstPage.total === firstPage.limit
  let i = 1
  while (loadMore) {
    const page = await getItemsPerPage(connection, address, result.length / firstPage.limit + 1)
    console.log(
      `getAllItems ${i} for ${address} page ${result.length / firstPage.limit + 1} has ${page.items.length} items`,
    )
    result.push(...page.items)
    loadMore = page.total === page.limit
    i++
  }
  console.log(`getAllItems for ${address} done: ${result.length} items`)
  return result
}

function getItemsPerPage(connection: WrappedConnection, address: string, page: number): Promise<ReadApiAssetList> {
  return connection.getAssetsByOwner({
    ownerAddress: address,
    limit: 1000,
    page: page,
  })
}
