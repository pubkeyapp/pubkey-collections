import { Box, Progress, Title } from '@mantine/core'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { UiCard, UiStack } from '@pubkey-collections/web/ui/core'

const linkColors = ['violet', 'indigo', 'blue', 'green', 'teal', 'cyan', 'pink', 'red', 'orange']

function getColorByIndex(index: number) {
  return linkColors[index % linkColors.length]
}

export function CollectionStats() {
  const { stats } = useCollection()
  const groups = Object.keys(stats)
    .map((key) => {
      return { key, stats: stats[key] }
    })
    .filter((group) => group.stats.length > 1)
    .map((group) => {
      const total = group.stats.reduce((acc, cur) => acc + (cur.count ?? 0), 0)
      const items = group.stats.map((stat) => ({
        value: stat.value,
        percent: ((stat.count ?? 0) / total) * 100,
      }))
      return {
        key: group.key,
        items,
      }
    })

  return (
    <UiCard>
      <UiStack>
        <Title order={3}>Stats</Title>
        {groups.map((group) => (
          <Box key={group.key}>
            <Title order={4}>{group.key}</Title>
            <Progress
              size="xl"
              sections={group.items.map((item, index) => ({
                value: item.percent,
                color: getColorByIndex(index),
                label: item?.percent > 10 ? item.value : item.value.slice(0, 1),
                tooltip: item.value + ' ' + item.percent.toFixed(2) + '%',
              }))}
            />
          </Box>
        ))}
      </UiStack>
    </UiCard>
  )
}
