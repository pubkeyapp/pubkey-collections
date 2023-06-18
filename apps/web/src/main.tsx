import { Stack, Text } from '@mantine/core'
import { StrictMode } from 'react'
import * as ReactDOM from 'react-dom/client'

// eslint-disable-next-line @typescript-eslint/no-var-requires
global.Buffer = require('buffer').Buffer

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <StrictMode>
    <Stack>
      <Text>Web App</Text>
    </Stack>
  </StrictMode>,
)
