import { Image, Stack, Text } from '@mantine/core'
import { UiCard, useUiTheme } from '@pubkey-collections/web/ui/core'
import { Collection } from '@pubkeyapp/collections'

export function CollectionGridItem({ item }: { item: Collection }) {
  const { isSmall } = useUiTheme()
  return (
    <UiCard p={0}>
      <Image src={item.image} alt={item.name} />
      <Stack
        sx={{ flexDirection: isSmall ? 'column' : 'row' }}
        justify={isSmall ? 'stretch' : 'space-between'}
        align={'center'}
        spacing={isSmall ? 'xs' : 'md'}
        p={isSmall ? 'xs' : 'md'}
      >
        <Text size={isSmall ? 'xs' : 'xl'} weight={700}>
          {item.name}
        </Text>
        {item.publisher ? (
          <Text size="sm" weight={500} color="dimmed">
            by {item.publisher}
          </Text>
        ) : null}
      </Stack>
    </UiCard>
  )
}
