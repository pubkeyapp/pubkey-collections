import { Group, GroupProps, Text } from '@mantine/core'
import { User } from '@pubkey-collections/sdk'
import { UiGroup, UiStack, UiStatus } from '@pubkey-collections/web/ui/core'
import { WebUserUiAvatar, WebUserUiVerified } from '@pubkey-collections/web/user/ui'

export interface WebProfileUiUserProps extends GroupProps {
  user?: User
}

export function WebProfileUiUser({ user, ...props }: WebProfileUiUserProps) {
  return (
    <UiGroup position="left" style={{ flexGrow: 1 }} align="center" {...props}>
      <WebUserUiAvatar size="xl" user={user} />
      <UiGroup position="left" spacing={4} align="baseline">
        <UiStack spacing={0}>
          <Group spacing={2}>
            {user?.username ? (
              <Text size="xl" weight={700}>
                {user.username}
              </Text>
            ) : null}
            <WebUserUiVerified user={user} />
          </Group>
          {user?.name ? <Text size="lg">{user.name}</Text> : null}
          <Group spacing="xs">{user?.location ? <UiStatus>🌐 {user.location}</UiStatus> : null}</Group>
        </UiStack>
      </UiGroup>
    </UiGroup>
  )
}
