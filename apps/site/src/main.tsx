import { SiteShellFeature } from '@pubkey-collections/site/shell/feature'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

// eslint-disable-next-line @typescript-eslint/no-var-requires
global.Buffer = require('buffer').Buffer

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <SiteShellFeature />
  </StrictMode>,
)
