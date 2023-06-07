import { useUserProfile } from '@pubkey-collections/web/profile/data-access'
import { WebProfileUiUser } from '@pubkey-collections/web/profile/ui'
import { UiCard, UiContainer, UiLoader, UiStack, UiWarn } from '@pubkey-collections/web/ui/core'
import { useParams } from 'react-router-dom'

export function WebProfileDetailFeature() {
  const { username } = useParams<{ username: string }>() as { username: string }
  const { user, query } = useUserProfile(username)

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
      </UiStack>
    </UiContainer>
  )
}
