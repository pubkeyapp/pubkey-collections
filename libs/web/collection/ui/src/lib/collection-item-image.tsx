import { Group, Image, ImageProps, Modal, Text, UnstyledButton } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { UiCopy, UiStack } from '@pubkey-collections/web/ui/core'
import { CollectionItem, CollectionTrait } from '@pubkeyapp/collections'
import { CollectionTraitGroup } from './collection-trait-group'

export interface CollectionItemProps extends ImageProps {
  item: CollectionItem
  toggleTrait?: (trait: CollectionTrait) => void
}

export function CollectionItemImage({ item, toggleTrait, ...props }: CollectionItemProps) {
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
        <CollectionItemCard item={item} toggleTrait={toggleTrait} />
      </Modal>
      <UnstyledButton display="inherit" onClick={open}>
        <Image key={item.id} src={item.image} alt={item.name} {...props} />
      </UnstyledButton>
    </>
  )
}

export function CollectionItemCard({
  item,
  toggleTrait,
}: {
  item: CollectionItem
  toggleTrait?: (trait: CollectionTrait) => void
}) {
  return (
    <UiStack pb="md">
      <Image key={item.id} src={item.image} alt={item.name} />
      <CollectionTraitGroup position="center" traits={item.traits} withLabel toggleTrait={toggleTrait} />
      <Group position="center" spacing={2}>
        <Text size="xs" color="dimmed">
          {item.id}
        </Text>
        <UiCopy text={item.id} tooltip="Copy Collection Item ID" />
      </Group>
    </UiStack>
  )
}
