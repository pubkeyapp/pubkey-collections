import { WebProfileUiUser } from '@pubkey-collections/web/profile/ui'
import { useUserSettings } from '@pubkey-collections/web/settings/data-access'
import { WebSettingsUiProfileForm } from '@pubkey-collections/web/settings/ui'
import { UiCard, UiContainer, UiLoader, UiStack, UiWarn } from '@pubkey-collections/web/ui/core'

export function WebSettingsRoutes() {
  const { updateUser, user, query } = useUserSettings()

  if (query.isLoading) {
    return <UiLoader />
  }

  if (!user) {
    return <UiWarn message="User not found" />
  }

  return (
    <UiContainer size="xs">
      <UiStack>
        <UiCard>
          <WebProfileUiUser user={user} />
        </UiCard>
        <UiCard>
          <WebSettingsUiProfileForm user={user} submit={updateUser} />
        </UiCard>
      </UiStack>
    </UiContainer>
  )
}
