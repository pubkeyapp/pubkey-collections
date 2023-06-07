import { AdminUpdateInviteInput } from '@pubkey-collections/sdk'
import { useWebSdk } from '@pubkey-collections/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-collections/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'

export function useAdminInvite(inviteId: string) {
  const sdk = useWebSdk()

  const query = useQuery(
    ['admin', 'invites', 'get', inviteId],
    () => sdk.adminGetInvite({ inviteId }).then((res) => res.data),
    { retry: 0 },
  )

  const invite = query.data?.item ?? undefined

  return {
    invite,
    query,
    updateInvite: async (input: AdminUpdateInviteInput): Promise<boolean> =>
      sdk
        .adminUpdateInvite({
          inviteId,
          input: { ...input },
        })
        .then(async (res) => {
          await query.refetch()
          if (res.data?.item) {
            return showNotificationSuccess('Invite created')
          }
          return false
        })
        .catch((err) => showNotificationError(err.message)),
  }
}
