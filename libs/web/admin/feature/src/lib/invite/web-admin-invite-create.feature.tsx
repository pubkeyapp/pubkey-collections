import { AdminCreateInviteInput } from '@pubkey-collections/sdk'
import { useAdminInvites } from '@pubkey-collections/web/admin/data-access'
import { AdminUiBack, AdminUiPage } from '@pubkey-collections/web/admin/ui'
import { formFieldDate, formFieldNumber, UiCard, UiForm, UiFormField } from '@pubkey-collections/web/ui/core'
import { Button, Group } from '@mantine/core'
import { useNavigate } from 'react-router-dom'

export function WebAdminInviteCreateFeature() {
  const navigate = useNavigate()
  const { createInvite } = useAdminInvites()

  const create = async (invite: AdminCreateInviteInput): Promise<boolean> => {
    return createInvite(invite).then((res) => {
      if (typeof res !== 'boolean') {
        navigate(`/admin/invites/${res.id}`)
      }
      return !!res
    })
  }

  const fields: UiFormField<AdminCreateInviteInput>[] = [
    formFieldNumber('maxUses', {
      label: 'Maximum uses',
      description: 'Set the maximum number of times this invite can be used. Set to zero for unlimited.',
    }),
    formFieldDate('expiresAt', {
      label: 'Invite expiration',
      description: 'Set the date this invite expires. Leave blank for no expiration.',
      minDate: new Date(),
    }),
  ]

  return (
    <AdminUiPage leftAction={<AdminUiBack />} title="Create Invite">
      <UiCard>
        <UiForm<AdminCreateInviteInput>
          fields={fields}
          model={{ maxUses: 0, expiresAt: '', ownerId: '' }}
          submit={create}
        >
          <Group position="right">
            <Button type="submit">Create</Button>
          </Group>
        </UiForm>
      </UiCard>
    </AdminUiPage>
  )
}
