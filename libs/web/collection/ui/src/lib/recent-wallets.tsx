import { Badge, Button, Group, Stack } from '@mantine/core'
import { useRecentWallets } from '@pubkey-collections/web/collection/data-access'
import { ellipsify } from '@pubkey-collections/web/ui/core'
import React from 'react'

export function RecentWallets({ select }: { select: (account: string) => void }) {
  const { recentWallets } = useRecentWallets()

  return (
    <Group position="center">
      <Stack spacing="xs" align="center">
        <Badge variant="light" color="gray" size="sm" radius="sm">
          Recent wallets
        </Badge>
        {recentWallets.map((wallet) => (
          <Button size="xs" variant="subtle" key={wallet} onClick={() => select(wallet)}>
            {ellipsify(wallet)}
          </Button>
        ))}
      </Stack>
    </Group>
  )
}
