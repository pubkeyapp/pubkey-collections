import { Button, Group } from '@mantine/core'
import { useWebAuth } from '@pubkey-collections/web/auth/data-access'

import { UiContainer, UiPageHeader, UiStack } from '@pubkey-collections/web/ui/core'
import { useNavigate } from 'react-router-dom'

export function WebDashboardRoutes() {
  const { logout, user } = useWebAuth()

  const navigate = useNavigate()

  const logoutHandler = () => logout().then(() => navigate('/'))

  return (
    <UiContainer>
      <UiStack>
        <UiPageHeader
          title={`Welcome, ${user?.name?.length ? user.name : user?.username}!`}
          actions={
            <Group>
              <Button size="xs" variant="default" onClick={logoutHandler}>
                Log out
              </Button>
            </Group>
          }
        />
      </UiStack>
    </UiContainer>
  )
}
