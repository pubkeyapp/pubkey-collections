import { AdminCreateIdentityInput, AdminFindIdentitiesInput, Identity } from '@pubkey-collections/sdk'
import { useWebSdk } from '@pubkey-collections/web/shell/data-access'
import { notifyError, notifySuccess } from '@pubkey-collections/web/ui/notifications'
import { modals } from '@mantine/modals'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminIdentity(userId: string) {
  const sdk = useWebSdk()

  const [input] = useState<AdminFindIdentitiesInput>({
    ownerId: userId,
  })

  const query = useQuery(['admin', 'identities', 'find', input], () =>
    sdk.adminFindIdentities({ input }).then((res) => res.data),
  )

  return {
    createIdentity: async (input: AdminCreateIdentityInput) => {
      try {
        const res = await sdk.adminCreateIdentity({ input: { ...input, ownerId: userId } })

        if (res) {
          notifySuccess('Identity created')
          modals.closeAll()
          await query.refetch()
          return true
        }
        notifyError('Error creating identity')
        return false
      } catch (err) {
        notifyError(`${err}`)
        return false
      }
    },
    deleteIdentity: (identity: Identity) => {
      return sdk.adminDeleteIdentity({ identityId: identity.id }).then(async (res) => {
        if (res) {
          notifySuccess('Identity deleted')
          await query.refetch()
          return true
        }
        notifyError('Error deleting identity')
        return false
      })
    },
    identities: query.data?.items ?? [],
    query,
  }
}
