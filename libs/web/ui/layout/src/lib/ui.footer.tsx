import { ActionIcon, Container, createStyles, Group, Modal, rem, Title, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconBrandDiscord, IconBrandGithub, IconBrandTwitter, IconHeartFilled } from '@tabler/icons-react'
import { SponsorPanel } from './sponsor-panel'

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]}`,
  },
  inner: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: theme.spacing.xs,
    paddingBottom: theme.spacing.xs,

    [theme.fn.smallerThan('xs')]: {
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
}))

export function UiFooter() {
  const { classes } = useStyles()
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Group spacing={0} position="right" noWrap>
          <Tooltip label="Say thanks">
            <ActionIcon size="lg" color="pink" onClick={open}>
              <IconHeartFilled size="1.05rem" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Join our Discord">
            <ActionIcon
              size="lg"
              color="brand"
              component="a"
              target="_blank"
              href="https://discord.gg/XxuZQeDPNf"
              rel="noreferrer noopener"
            >
              <IconBrandDiscord size="1.05rem" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Star us on GitHub">
            <ActionIcon
              size="lg"
              color="brand"
              component="a"
              target="_blank"
              href="https://github.com/pubkeyapp/pubkey-collections"
              rel="noreferrer noopener"
            >
              <IconBrandGithub size="1.05rem" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Follow us on Twitter">
            <ActionIcon
              size="lg"
              color="brand"
              component="a"
              target="_blank"
              href="https://twitter.com/pubkeyapp"
              rel="noreferrer noopener"
            >
              <IconBrandTwitter size="1.05rem" stroke={1.5} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Container>
      <Modal opened={opened} onClose={close} size="xl" title={<Title>Say thanks</Title>} centered>
        <SponsorPanel />
      </Modal>
    </div>
  )
}
