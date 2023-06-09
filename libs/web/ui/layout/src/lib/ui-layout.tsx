import { Anchor, Container, Flex, Footer, Stack, Text } from '@mantine/core'
import { UiLoader } from '@pubkey-collections/web/ui/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { ReactNode, Suspense } from 'react'
import { UiHeader } from './ui.header'

export function UiLayout({ children }: { children: ReactNode }) {
  return (
    <Flex h="100vh" w="100vw" direction="column" justify="space-between" align="stretch">
      <UiHeader icon={PubKeyLogo} />
      <Container fluid py="md" w="100%" sx={{ flexGrow: 1, overflow: 'auto' }}>
        <Suspense fallback={<UiLoader type="full" />}>{children}</Suspense>
      </Container>
      <Footer height={50} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Text size="sm" color="dimmed">
          By{' '}
          <Anchor target="_blank" href="https://twitter.com/beeman_nl">
            @beeman_nl
          </Anchor>
          &middot;{' '}
          <Anchor target="_blank" href="https://github.com/pubkeyapp/pubkey-collections">
            source
          </Anchor>
        </Text>
      </Footer>
    </Flex>
  )
}
