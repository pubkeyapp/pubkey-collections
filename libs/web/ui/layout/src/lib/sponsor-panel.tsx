import { Anchor, Code, Group, List, Text } from '@mantine/core'
import { UiCopy, UiExplorerIcon, UiStack } from '@pubkey-collections/web/ui/core'
import { IconBrandGithub, IconBrandTwitter, IconCurrencySolana, IconGift } from '@tabler/icons-react'

export function SponsorPanel() {
  return (
    <UiStack>
      <Text>I'm glad that you are using my product. If you like it, please consider supporting the project.</Text>
      <Text>There are several ways to do it:</Text>
      <SponsorOptions />
      <Text>❤ Your support is highly appreciated!</Text>
    </UiStack>
  )
}

export function SponsorOptions() {
  return (
    <List>
      <List.Item icon={<IconBrandTwitter stroke={1.5} />}>
        Follow{' '}
        <Anchor
          href="https://twitter.com/beeman_nl"
          target="_blank"
          rel="noreferrer noopener"
          variant="link"
          color="blue"
        >
          @beeman_nl
        </Anchor>{' '}
        and{' '}
        <Anchor
          href="https://twitter.com/pubkeyapp"
          target="_blank"
          rel="noreferrer noopener"
          variant="link"
          color="blue"
        >
          @PubKeyApp
        </Anchor>{' '}
        on Twitter
      </List.Item>
      <List.Item icon={<IconCurrencySolana stroke={1.5} />}>
        Send SOL, SPL tokens or NFTs
        <List>
          <List.Item>
            <Group spacing={2}>
              <Code color="brand">PBKY..sWRb</Code>
              <UiCopy text={'PBKYNFdtjqtoQUCRxwEE3THUaNof3gY4qTiMYzysWRb'} />
              <UiExplorerIcon path={'account/PBKYNFdtjqtoQUCRxwEE3THUaNof3gY4qTiMYzysWRb'} />
            </Group>
          </List.Item>
          <List.Item>
            <Text size="sm" color="dimmed">
              Help me complete my{' '}
              <Anchor
                href="https://collections.pubkey.fun/collections/drip_the_faceless/common?q=beeman.sol"
                target="_blank"
                rel="noreferrer noopener"
                variant="link"
                color="blue"
              >
                The Faceless combos
              </Anchor>
              .
            </Text>
          </List.Item>
          <List.Item>
            <Text size="sm" color="dimmed">
              Feel free to share the tx hash with me on Twitter or Discord so I can thank you personally.
            </Text>
          </List.Item>
        </List>
      </List.Item>
      <List.Item icon={<IconBrandGithub stroke={1.5} />} sx={{ alignItems: 'center' }}>
        Sponsor me on{' '}
        <Anchor
          href="https://github.com/sponsors/beeman"
          target="_blank"
          rel="noreferrer noopener"
          variant="link"
          color="blue"
        >
          GitHub
        </Anchor>
        <List>
          <List.Item>
            <Text size="sm" color="dimmed">
              You can choose between monthly and one-time sponsorship.
            </Text>
          </List.Item>
        </List>
      </List.Item>
    </List>
  )
}
