import { AdminUpdateInviteInput, Invite } from '@pubkey-collections/sdk'
import { formFieldDate, formFieldNumber, UiCard, UiForm, UiFormField } from '@pubkey-collections/web/ui/core'
import { Button, Group } from '@mantine/core'

export function WebAdminInviteSettingsTab({
  invite,
  updateInvite,
}: {
  invite: Invite
  updateInvite: (invite: Partial<AdminUpdateInviteInput>) => Promise<boolean>
}) {
  const fields: UiFormField<AdminUpdateInviteInput>[] = [
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
    <UiCard>
      <UiForm<AdminUpdateInviteInput>
        fields={fields}
        model={{
          maxUses: invite.maxUses ?? 0,
          expiresAt: invite.expiresAt ?? undefined,
        }}
        submit={updateInvite}
      >
        <Group position="right">
          <Button type="submit">Submit</Button>
        </Group>
      </UiForm>
    </UiCard>
  )
}
