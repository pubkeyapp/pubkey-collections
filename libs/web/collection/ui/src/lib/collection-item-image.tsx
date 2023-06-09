import { Box, Code, Group, Image, ImageProps, Modal, Text, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiCopy, UiDebug, UiStack } from '@pubkey-collections/web/ui/core'
import { CollectionItem } from '@pubkeyapp/collections'
import { CollectionTraitGroup } from './collection-trait-group'

export interface CollectionItemProps extends ImageProps {
  item: CollectionItem
}

export function CollectionItemImage({ item, ...props }: CollectionItemProps) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title={item.name ?? ''}
        centered
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <CollectionItemCard item={item} />
      </Modal>
      <UnstyledButton display="inherit" onClick={open}>
        <Image key={item.id} src={item.image} alt={item.name} {...props} />
      </UnstyledButton>
    </>
  )
}

export function CollectionItemCard({ item, ...props }: CollectionItemProps) {
  return (
    <UiStack pb="md">
      <Image key={item.id} src={item.image} alt={item.name} />
      <CollectionTraitGroup position="center" traits={item.traits} withLabel />
      <Group position="center" spacing={2}>
        <Text size="xs" color="dimmed">
          {item.id}
        </Text>
        <UiCopy text={item.id} tooltip="Copy Collection Item ID" />
      </Group>
    </UiStack>
  )
}
