import { UserUpdateUserInput } from '@pubkey-collections/sdk'
import { useWebAuth } from '@pubkey-collections/web/auth/data-access'
import { useUserProfile } from '@pubkey-collections/web/profile/data-access'
import { useWebSdk } from '@pubkey-collections/web/shell/data-access'
import { notifyError } from '@pubkey-collections/web/ui/notifications'

export function useUserSettings() {
  const sdk = useWebSdk()
  const { user } = useWebAuth()
  const { query } = useUserProfile(user?.username as string)

  return {
    user: query.data?.item,
    query,
    updateUser: async (input: UserUpdateUserInput) => {
      return sdk
        .userUpdateUser({
          input,
        })
        .then(async (res) => {
          await query.refetch()
          return !!res.data
        })
        .catch((err) => {
          notifyError(err.message)
          return false
        })
    },
  }
}
