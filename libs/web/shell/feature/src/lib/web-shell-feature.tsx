import { SolanaProvider } from '@pubkey-collections/web/shell/data-access'
import { UiThemeProvider } from '@pubkey-collections/web/ui/core'
import { BrowserRouter } from 'react-router-dom'
import { WebShellRoutes } from './web-shell.routes'

export function WebShellFeature() {
  return (
    <BrowserRouter>
      <UiThemeProvider>
        <SolanaProvider cluster="https://rpc.helius.xyz/?api-key=2a88ca2b-67c0-44c7-b2b6-1f7851af671f">
          <WebShellRoutes />
        </SolanaProvider>
      </UiThemeProvider>
    </BrowserRouter>
  )
}
