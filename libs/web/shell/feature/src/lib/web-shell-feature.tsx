import { WebAuthProvider } from '@pubkey-collections/web/auth/data-access'
import { SolanaProvider, WebSdkProvider } from '@pubkey-collections/web/shell/data-access'
import { UiThemeProvider } from '@pubkey-collections/web/ui/core'
import { showNotificationError } from '@pubkey-collections/web/ui/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { WebShellRoutes } from './web-shell.routes'

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: () => {
        showNotificationError(`Something went wrong`, { title: 'Error' })
      },
    },
  },
})

export function WebShellFeature() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <UiThemeProvider>
          <WebSdkProvider>
            <SolanaProvider cluster="https://rpc.helius.xyz/?api-key=2a88ca2b-67c0-44c7-b2b6-1f7851af671f">
              <WebAuthProvider>
                <WebShellRoutes />
              </WebAuthProvider>
            </SolanaProvider>
          </WebSdkProvider>
        </UiThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
