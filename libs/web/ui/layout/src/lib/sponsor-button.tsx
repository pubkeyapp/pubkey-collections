import { ActionIcon, Modal, Title, Tooltip } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconHeartFilled } from '@tabler/icons-react'
import { SponsorPanel } from './sponsor-panel'

export function SponsorButton() {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Tooltip label="Say thanks">
        <ActionIcon size="lg" color="pink" onClick={open}>
          <IconHeartFilled size="1.05rem" stroke={1.5} />
        </ActionIcon>
      </Tooltip>
      <Modal opened={opened} onClose={close} size="xl" title={<Title>Say thanks</Title>} centered>
        <SponsorPanel />
      </Modal>
    </>
  )
}
