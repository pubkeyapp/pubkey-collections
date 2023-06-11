import { walletNameToAddressAndProfilePicture } from '@portal-payments/solana-wallet-names'
import { useSolana } from '@pubkey-collections/web/shell/data-access'
import { CollectionWallet } from '@pubkeyapp/collections'
import { Connection, PublicKey } from '@solana/web3.js'
import { useQuery } from '@tanstack/react-query'

function isValidSolanaPublicKey(publicKey: string): boolean {
  try {
    new PublicKey(publicKey)
    return true
  } catch (_) {
    return false
  }
}

export async function fetchPublicKey(connection: Connection, query: string): Promise<CollectionWallet | undefined> {
  const extensions = ['.abc', '.backpack', '.bonk', '.glow', '.sol', '.ottr', '.poor']
  const hasExtension = extensions.some((ext) => query.endsWith(ext))

  if (hasExtension) {
    const res = await walletNameToAddressAndProfilePicture(connection, query)
    return { picture: res.profilePicture ?? undefined, address: res.walletAddress ?? undefined }
  } else {
    isValidSolanaPublicKey(query)
    // FIXME: this reverse lookup is slow and expensive so we'll skip it for now until we move it to the api
    // const res = await walletAddressToNameAndProfilePicture(connection, new PublicKey(query))
    // return { picture: res.profilePicture ?? undefined, address: res.walletName ?? undefined }
    return { address: query }
  }
}

export function useCollectionWallet({ account }: { account: string }) {
  const { connection } = useSolana()

  return useQuery({
    queryKey: ['collection', 'wallet', account],
    queryFn: () => {
      return fetchPublicKey(connection, account)
    },
    suspense: true,
  })
}
