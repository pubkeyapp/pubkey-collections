import { Box, Container } from '@mantine/core'
import { UiLoader } from '@pubkey-collections/web/ui/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { ReactNode, Suspense } from 'react'
import { UiHeader } from './ui.header'

export function UiLayout({ children }: { children: ReactNode }) {
  return (
    <Box>
      <UiHeader icon={PubKeyLogo} />
      <Container fluid py="md">
        <Suspense fallback={<UiLoader type="full" />}>{children}</Suspense>
      </Container>
    </Box>
  )
}
