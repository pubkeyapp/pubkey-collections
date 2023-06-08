import { AppShell, useMantineTheme } from '@mantine/core'
import { useWebAuth } from '@pubkey-collections/web/auth/data-access'
import { useUserNotifications } from '@pubkey-collections/web/notification/data-access'
import { UiLoader } from '@pubkey-collections/web/ui/core'
import { IconBell, IconDashboard, IconDatabase, IconSettings, IconShield, IconUser } from '@tabler/icons-react'
import { ReactNode, Suspense, useMemo, useState } from 'react'

import { UiNavbar, UiNavbarLink } from './ui-navbar'
import { UiHeader } from './ui.header'

export function UiLayout({ children, profile }: { children: ReactNode; profile?: ReactNode }) {
  const { authenticated } = useWebAuth()
  const theme = useMantineTheme()
  const [opened, setOpened] = useState(false)

  const { unreadCount } = useUserNotifications()

  const navbarLinks: UiNavbarLink[] = useMemo(() => {
    return [
      { link: '/dashboard', label: 'Dashboard', icon: IconDashboard },
      { link: '/notifications', label: 'Notifications', icon: IconBell, counter: unreadCount },
      { link: '/profile', label: 'Profile', icon: IconUser },
      { link: '/settings', label: 'Settings', icon: IconSettings },
      { link: '/admin', label: 'Admin', icon: IconShield },
    ]
  }, [unreadCount])

  return (
    <AppShell
      header={<UiHeader text="PubKey" icon={IconDatabase} opened={opened} setOpened={setOpened} profile={profile} />}
      navbar={authenticated ? <UiNavbar links={navbarLinks} opened={opened} setOpened={setOpened} /> : undefined}
      navbarOffsetBreakpoint="sm"
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          height: '100vh',
        },
      }}
    >
      <Suspense fallback={<UiLoader type="full" />}>{children}</Suspense>
    </AppShell>
  )
}
