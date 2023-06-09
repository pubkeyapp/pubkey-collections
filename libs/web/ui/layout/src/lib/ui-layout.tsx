import { Anchor, Container, Flex, Footer, Group, Text } from '@mantine/core'
import { UiLoader, useUiTheme } from '@pubkey-collections/web/ui/core'
import { PubKeyLogo } from '@pubkeyapp/logo'
import { ReactNode, Suspense } from 'react'
import { UiHeader } from './ui.header'

export function UiLayout({ children }: { children: ReactNode }) {
  const { isSmall } = useUiTheme()
  return (
    <Flex h="100%" direction="column" justify="space-between">
      <UiHeader icon={PubKeyLogo} />
      <Container fluid py="md" w="100%" sx={{ flexGrow: 1, overflow: 'auto' }} pb="xl" px={isSmall ? 'xs' : undefined}>
        <Suspense fallback={<UiLoader type="full" />}>{children}</Suspense>
      </Container>
      <Footer height={42} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Group position="center">
          <Text size="sm" color="dimmed">
            <Anchor target="_blank" href="https://twitter.com/beeman_nl">
              @beeman_nl
            </Anchor>{' '}
            &middot;{' '}
            <Anchor target="_blank" href="https://github.com/pubkeyapp/pubkey-collections">
              source
            </Anchor>{' '}
            &middot;{' '}
            <Anchor target="_blank" href="https://discord.gg/XxuZQeDPNf">
              support
            </Anchor>
          </Text>
        </Group>
      </Footer>
    </Flex>
  )
}
