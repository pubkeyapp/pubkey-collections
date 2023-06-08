import { UserStatus } from '@pubkey-collections/sdk'
import { Badge, useMantineTheme } from '@mantine/core'

export const USER_STATUS_COLORS: Record<UserStatus, string> = {
  [UserStatus.Active]: 'green',
  [UserStatus.Created]: 'blue',
  [UserStatus.Inactive]: 'gray',
}

export function WebUiUserStatusBadge({ status }: { status: UserStatus }) {
  const theme = useMantineTheme()
  return (
    <Badge color={USER_STATUS_COLORS[status]} variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}>
      {status}
    </Badge>
  )
}
