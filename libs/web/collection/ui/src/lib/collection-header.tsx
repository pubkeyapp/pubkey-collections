import { Avatar, Box, Group, Progress, Stack, Text, Title } from '@mantine/core'
import { UiCard, UiStack, useUiTheme } from '@pubkey-collections/web/ui/core'
import { Collection, CollectionTraitMap } from '@pubkeyapp/collections'
import React, { ReactNode } from 'react'

export function CollectionHeader({ children, collection }: { children: ReactNode; collection: Collection }) {
  const { isSmall } = useUiTheme()
  return (
    <Stack
      sx={{ flexDirection: isSmall ? 'column' : 'row' }}
      justify={isSmall ? 'stretch' : 'space-between'}
      align={'center'}
      spacing={isSmall ? 'xs' : 'md'}
    >
      <Group spacing="xs">
        <Avatar size="lg" src={collection.image} alt={collection.name} />
        <UiStack spacing={0}>
          <Text size="xl" weight={700}>
            {collection.name}
          </Text>
          {collection.publisher ? (
            <Text size="sm" weight={500} color="dimmed">
              by {collection.publisher}
            </Text>
          ) : null}
        </UiStack>
      </Group>
      {children}
    </Stack>
  )
}

const linkColors = ['violet', 'indigo', 'blue', 'green', 'teal', 'cyan', 'pink', 'red', 'orange']

export function getColorByIndex(index: number) {
  return linkColors[index % linkColors.length]
}
export function CollectionStats({ stats }: { stats: CollectionTraitMap }) {
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
