import { Container, Flex } from '@mantine/core'
import { UiLoader, useUiTheme } from '@pubkey-collections/web/ui/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { ReactNode, Suspense } from 'react'
import { UiFooter } from './ui.footer'
import { UiHeader } from './ui.header'

export function UiLayout({ children }: { children: ReactNode }) {
  const { isSmall } = useUiTheme()
  return (
    <Flex h="100%" direction="column" justify="space-between" sx={{ position: 'relative', zIndex: 1 }}>
      <UiHeader icon={PubKeyLogo} />
      <Container fluid py="md" w="100%" sx={{ flexGrow: 1, overflow: 'auto' }} pb="xl" px={isSmall ? 'xs' : undefined}>
        <Suspense fallback={<UiLoader type="full" />}>{children}</Suspense>
      </Container>
      <UiFooter />
    </Flex>
  )
}
