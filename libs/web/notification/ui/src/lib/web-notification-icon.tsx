import { Notification, NotificationType } from '@pubkey-collections/sdk'
import { rem, useMantineTheme } from '@mantine/core'
import { IconBell, IconHandFinger } from '@tabler/icons-react'

export function WebNotificationIcon({ notification }: { notification: Notification }) {
  const theme = useMantineTheme()
  const getColor = (color: string) => theme.colors[color][theme.colorScheme === 'dark' ? 5 : 7]

  switch (notification.type) {
    case NotificationType.Poke:
      return <IconHandFinger size={rem(20)} color={getColor('orange')} />
    default:
      return <IconBell size={rem(20)} color={getColor('brand')} />
  }
}
