import { Anchor, Group, Header } from '@mantine/core'
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
          <Group>
            <UiThemeToggle />
          </Group>
        </Group>
      </div>
    </Header>
  )
}
