import { AdminCreateUserInput } from '@pubkey-collections/sdk'
import { useAdminUsers } from '@pubkey-collections/web/admin/data-access'
import { AdminUiBack, AdminUiPage, AuthUiCreateUserForm } from '@pubkey-collections/web/admin/ui'
import { UiCard } from '@pubkey-collections/web/ui/core'
import { notifyError } from '@pubkey-collections/web/ui/notifications'

import { Button, Group } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export function WebAdminUserCreateFeature() {
  const navigate = useNavigate()
  const { createUser } = useAdminUsers()

  const submit = async (input: AdminCreateUserInput) =>
    createUser(input)
      .then((res) => navigate(`/admin/users/${res?.id}`))
      .then(() => true)
      .catch((err) => {
        notifyError(err.message)
        return false
      })

  return (
    <AdminUiPage leftAction={<AdminUiBack />} title="Create User">
      <UiCard>
        <AuthUiCreateUserForm submit={submit}>
          <Group position="right">
            <Button type="submit">Create</Button>
          </Group>
        </AuthUiCreateUserForm>
      </UiCard>
    </AdminUiPage>
  )
}
