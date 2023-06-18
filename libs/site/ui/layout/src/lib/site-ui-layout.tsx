import { Container, Flex } from '@mantine/core'
import { UiLoader, useUiTheme } from '@pubkey-collections/web/ui/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { ReactNode, Suspense } from 'react'
import { SiteUiFooter } from './site-ui-footer'
import { SiteUiHeader } from './site-ui-header'

export function SiteUiLayout({ children }: { children: ReactNode }) {
  const { isSmall } = useUiTheme()
  return (
    <Flex h="100%" direction="column" justify="space-between" sx={{ position: 'relative', zIndex: 1 }}>
      <SiteUiHeader icon={PubKeyLogo} />
      <Container fluid py="md" w="100%" sx={{ flexGrow: 1, overflow: 'auto' }} pb="xl" px={isSmall ? 'xs' : undefined}>
        <Suspense fallback={<UiLoader type="full" />}>{children}</Suspense>
      </Container>
      <SiteUiFooter />
    </Flex>
  )
}
