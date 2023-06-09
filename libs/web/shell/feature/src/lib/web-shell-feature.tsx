import { SolanaProvider } from '@pubkey-collections/web/shell/data-access'
import { UiThemeProvider } from '@pubkey-collections/web/ui/core'
import { BrowserRouter } from 'react-router-dom'
import { WebShellRoutes } from './web-shell.routes'

export function WebShellFeature() {
  return (
    <BrowserRouter>
      <UiThemeProvider>
        <SolanaProvider cluster="https://rpc.pubkey.network">
          <WebShellRoutes />
        </SolanaProvider>
      </UiThemeProvider>
    </BrowserRouter>
  )
}
