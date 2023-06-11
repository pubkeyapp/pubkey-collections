import { Progress, Text } from '@mantine/core'
import { UiStack } from '@pubkey-collections/web/ui/core'
import { CollectionStat } from '@pubkeyapp/collections'

const linkColors = ['violet', 'indigo', 'blue', 'green', 'teal', 'cyan', 'pink', 'red', 'orange']

function getColorByIndex(index: number) {
  return linkColors[index % linkColors.length]
}

export function CollectionStatItem({ item, index }: { item: CollectionStat; index: number }) {
  return (
    <UiStack key={item.value} spacing={2}>
      <Text size="sm">{item.value}</Text>
      <Progress size="xl" color={getColorByIndex(index)} value={item.percent} label={`${item.percent.toFixed(2)}%`} />
    </UiStack>
  )
}
