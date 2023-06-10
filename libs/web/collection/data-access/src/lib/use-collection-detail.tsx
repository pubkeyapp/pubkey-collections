import { useLocalStorage } from '@mantine/hooks'
import { useSolana } from '@pubkey-collections/web/shell/data-access'
import { CollectionWallet, findCollectionById } from '@pubkeyapp/collections'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchPublicKey } from './use-collection-wallet'

export function useRecentWallets() {
  const [recentWallets, setRecentWallets] = useLocalStorage<string[]>({
    defaultValue: ['beeman.sol'],
    getInitialValueInEffect: true,
    key: 'pubkey-recent-wallets',
  })

  return {
    recentWallets,
    setRecentWallets,
  }
}

export function useCollectionDetail(collectionId: string) {
  const collection = findCollectionById(collectionId)
  const [searchParams, setSearchParams] = useSearchParams({})
  const [account, setAccount] = useState('')
  const [wallet, setWallet] = useState<CollectionWallet | undefined>(undefined)
  const [loading, setLoading] = useState(false)

  const { setRecentWallets } = useRecentWallets()

  const { connection } = useSolana()

  useEffect(() => {
    setWallet(undefined)
    setAccount(searchParams.get('q') ?? '')
  }, [searchParams])

  useEffect(() => {
    if (!account) return
    loadWallet()
  }, [account])

  const loadWallet = () => {
    if (!collection || !account) return
    setWallet(undefined)
    setLoading(true)
    fetchPublicKey(connection, account)
      .then((res) => {
        setRecentWallets((prev) => {
          if (prev.includes(account)) return prev
          return [account, ...prev].slice(0, 5)
        })
        setWallet({ picture: res?.picture, address: res?.address ?? account })
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    account,
    loading,
    collection,
    setAccount: (q: string) => setSearchParams({ q }),
    wallet,
  }
}
