import { ActionIcon, Anchor, Group, Header } from '@mantine/core'
import { IconMoonStars, IconSettings, IconSun } from '@tabler/icons-react'
import { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import { UiThemeToggle } from './ui-theme.toggle'

export interface UiHeaderProps {
  icon: ComponentType<{ size: number }>
}

export function UiHeader({ icon: Icon }: UiHeaderProps) {
  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Group position="apart" sx={{ flexGrow: 1 }}>
          <Anchor component={Link} to="/" replace underline={false}>
            <Group spacing="xs">
              <Icon size={24} />
            </Group>
          </Anchor>
          <Group spacing="xs">
            <ActionIcon
              component={Link}
              to="/settings"
              size="lg"
              color="brand"
              sx={(theme) => ({
                backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                color: theme.colorScheme === 'dark' ? theme.colors.brand[4] : theme.colors.brand[6],
              })}
            >
              <IconSettings size="1.05rem" stroke={1.5} />
            </ActionIcon>
            <UiThemeToggle />
          </Group>
        </Group>
      </div>
    </Header>
  )
}
