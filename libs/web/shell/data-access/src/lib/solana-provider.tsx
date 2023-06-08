import { WalletModalProvider } from '@pubkeyapp/wallet-adapter-mantine-ui'
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare'
import { clusterApiUrl } from '@solana/web3.js'
import { createContext, ReactNode, useContext, useMemo } from 'react'
import { WrappedConnection } from './wrapped-connection/wrapped-connection'

export interface SolanaProviderContext {
  connection: WrappedConnection
  endpoint: string
}

const SolanaContext = createContext<SolanaProviderContext>({} as SolanaProviderContext)

export function SolanaProvider({ children, cluster }: { children: ReactNode; cluster: string | WalletAdapterNetwork }) {
  const endpoint = useMemo(() => {
    const value = cluster

    if (!value?.startsWith('http')) {
      return clusterApiUrl(cluster.toLowerCase() as WalletAdapterNetwork)
    }

    return value
  }, [cluster])

  const wallets = useMemo(
    () => [
      new SolflareWalletAdapter(),
      // Add more wallets here
    ],
    [],
  )

  const value: SolanaProviderContext = {
    connection: new WrappedConnection(endpoint),
    endpoint,
  }

  return (
    <SolanaContext.Provider value={value}>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>{children}</WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </SolanaContext.Provider>
  )
}

export const useSolana = () => useContext(SolanaContext)
