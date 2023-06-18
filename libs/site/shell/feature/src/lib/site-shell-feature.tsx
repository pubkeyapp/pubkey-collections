import { ClusterProvider, SolanaProvider } from '@pubkey-collections/web/shell/data-access'
import { UiThemeProvider } from '@pubkey-collections/web/ui/core'
import { notifyError } from '@pubkey-collections/web/ui/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { SiteShellRoutes } from './site-shell.routes'

const client = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: () => {
        notifyError(`Something went wrong`, { title: 'Error' })
      },
    },
  },
})

export function SiteShellFeature() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={client}>
        <UiThemeProvider>
          <ClusterProvider>
            <SolanaProvider>
              <SiteShellRoutes />
            </SolanaProvider>
          </ClusterProvider>
        </UiThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}
