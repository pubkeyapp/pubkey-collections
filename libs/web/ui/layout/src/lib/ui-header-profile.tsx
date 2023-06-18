import { Avatar, Button, createStyles, Group, Menu, rem, Text } from '@mantine/core'
import { UserRole } from '@pubkey-collections/sdk'
import { useWebAuth } from '@pubkey-collections/web/auth/data-access'
import { IconBell, IconChevronDown, IconLogout, IconSettings, IconShield, IconUser } from '@tabler/icons-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const useStyles = createStyles((theme) => ({}))

export function UiHeaderProfile() {
  const { user, logout } = useWebAuth()
  const { theme } = useStyles()
  const [userMenuOpened, setUserMenuOpened] = useState(false)

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <Button py={0} px="sm" variant={userMenuOpened ? 'filled' : 'light'}>
          <Group spacing={7}>
            <Avatar src={user?.avatarUrl} alt={user?.username ?? 'User Avatar'} radius="xl" size={20} />
            <Text weight={500} size="sm" sx={{ lineHeight: 1, color: theme.white }} mr={3}>
              {user?.username}
            </Text>
            <IconChevronDown size={rem(12)} stroke={1.5} />
          </Group>
        </Button>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item component={Link} to="/notifications" icon={<IconBell size="0.9rem" stroke={1.5} />}>
          Notifications
        </Menu.Item>
        <Menu.Item component={Link} to="/settings" icon={<IconSettings size="0.9rem" stroke={1.5} />}>
          Settings
        </Menu.Item>

        <Menu.Item component={Link} to={user?.profileUrl ?? ''} icon={<IconUser size="0.9rem" stroke={1.5} />}>
          Your profile
        </Menu.Item>
        {user?.role === UserRole.Admin && (
          <>
            <Menu.Divider />
            <Menu.Item component={Link} to="/admin" icon={<IconShield size="0.9rem" stroke={1.5} />}>
              Admin
            </Menu.Item>
          </>
        )}
        <Menu.Divider />
        <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />} onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
