import { WebShellFeature } from '@pubkey-collections/web/shell/feature'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <WebShellFeature />
  </StrictMode>,
)
