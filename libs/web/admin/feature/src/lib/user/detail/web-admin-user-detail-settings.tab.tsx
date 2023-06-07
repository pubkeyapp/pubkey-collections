import { useAdminUser } from '@pubkey-collections/web/admin/data-access'
import { AuthUiUpdateUserForm } from '@pubkey-collections/web/admin/ui'
import { UiAlert, UiCard } from '@pubkey-collections/web/ui/core'

export function WebAdminUserDetailSettingsTab({ userId }: { userId: string }) {
  const { user, updateUser } = useAdminUser(userId)

  return (
    <UiCard>
      {user ? <AuthUiUpdateUserForm user={user} submit={updateUser} /> : <UiAlert message="User not found." />}
    </UiCard>
  )
}
