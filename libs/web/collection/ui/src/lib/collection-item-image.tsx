import { Group, Image, ImageProps, Modal, Text, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiCopy, UiExplorerIcon } from '@pubkey-collections/web/ui/core'
import { CollectionItem } from '@pubkeyapp/collections'
import { CollectionItemCard } from './collection-item-card'

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
        size="xl"
        title={
          <Group position="center" spacing="xs">
            <UiCopy text={item.id} tooltip={`Copy Collection Item ID (${item.id.slice(0, 4)})... `} />
            <UiExplorerIcon path={`token/${item.id}`} />
            <Text>{item.name}</Text>
          </Group>
        }
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
