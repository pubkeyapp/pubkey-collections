import { WebAuthProvider } from '@pubkey-collections/web/auth/data-access'
import { ClusterProvider, SolanaProvider, WebSdkProvider } from '@pubkey-collections/web/shell/data-access'
import { UiThemeProvider } from '@pubkey-collections/web/ui/core'
import { notifyError } from '@pubkey-collections/web/ui/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { WebShellRoutes } from './web-shell.routes'

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: () => {
        notifyError(`Something went wrong`, { title: 'Error' })
      },
    },
  },
})

export function WebShellFeature() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <UiThemeProvider>
          <ClusterProvider>
            <SolanaProvider>
              <WebSdkProvider>
                <WebAuthProvider>
                  <WebShellRoutes />
                </WebAuthProvider>
              </WebSdkProvider>
            </SolanaProvider>
          </ClusterProvider>
        </UiThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
