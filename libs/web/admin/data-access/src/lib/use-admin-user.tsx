import { AdminUpdateUserInput } from '@pubkey-collections/sdk'
import { useWebSdk } from '@pubkey-collections/web/shell/data-access'
import { notifyError, notifySuccess } from '@pubkey-collections/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'

export function useAdminUser(userId: string) {
  const sdk = useWebSdk()
  const query = useQuery(
    ['admin', 'users', 'get', userId],
    () => sdk.adminGetUser({ userId }).then((res) => res.data),
    { retry: 0 },
  )
  const user = query.data?.item ?? undefined

  return {
    user,
    query,
    updateUser: async (input: AdminUpdateUserInput) =>
      sdk
        .adminUpdateUser({ userId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            notifySuccess('User updated')
            await query.refetch()
            return true
          }
          notifyError('User not updated')
          return false
        })
        .catch((err) => {
          notifyError(err.message)
          return false
        }),
  }
}
