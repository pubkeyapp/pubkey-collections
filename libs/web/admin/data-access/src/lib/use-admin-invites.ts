import { AdminCreateInviteInput, AdminFindInvitesInput, Invite } from '@pubkey-collections/sdk'
import { useWebSdk } from '@pubkey-collections/web/shell/data-access'
import { useUiPagination } from '@pubkey-collections/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-collections/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminInvites() {
  const sdk = useWebSdk()

  const [take, setTake] = useState(10)
  const [skip, setSkip] = useState(0)
  const [search, setSearch] = useState<string>('')
  const input: AdminFindInvitesInput = {
    take,
    skip,
    search,
  }

  const query = useQuery(['admin', 'invites', 'find', input], () => {
    return sdk.adminFindInvites({ input }).then((res) => res.data)
  })

  const total = query.data?.count?.total ?? 0

  return {
    invites: query.data?.items ?? [],
    query,
    setSearch,
    pagination: useUiPagination({
      skip,
      setSkip,
      take,
      setTake,
      total,
    }),
    createInvite: async (input: AdminCreateInviteInput): Promise<Invite | boolean> =>
      sdk
        .adminCreateInvite({ input })
        .then(async (res) => {
          if (res.data.item) {
            showNotificationSuccess('Invite created')
            await query.refetch()
            return res.data.item
          }
          return false
        })
        .catch((err) => showNotificationError(err.message)),
    deleteInvite: (inviteId: string): Promise<boolean> => {
      return sdk
        .adminDeleteInvite({ inviteId })
        .then(async (result) => {
          await query.refetch()
          if (result.data?.item) {
            return showNotificationSuccess(`Invite  deleted`)
          }
          return false
        })
        .catch((err) => showNotificationError(err.message))
    },
  }
}
