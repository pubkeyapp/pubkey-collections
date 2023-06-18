import { AdminCreateUserInput, AdminFindUsersInput, UserRole, UserStatus } from '@pubkey-collections/sdk'
import { useWebSdk } from '@pubkey-collections/web/shell/data-access'

import { useUiPagination } from '@pubkey-collections/web/ui/core'
import { notifyError, notifySuccess } from '@pubkey-collections/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminUsers() {
  const sdk = useWebSdk()
  const [role, setRole] = useState<UserRole | undefined>(undefined)
  const [status, setStatus] = useState<UserStatus | undefined>(undefined)
  const [take, setTake] = useState(10)
  const [skip, setSkip] = useState(0)
  const [search, setSearch] = useState<string>('')

  const input: AdminFindUsersInput = { role, skip, status, take, search }
  const query = useQuery(['admin', 'users', 'find', input], () => sdk.adminFindUsers({ input }).then((res) => res.data))
  const total = query.data?.count?.total ?? 0

  return {
    createUser: (input: AdminCreateUserInput) =>
      sdk
        .adminCreateUser({ input })
        .then((res) => res.data)
        .then((res) => {
          if (res.created) {
            notifySuccess(`User  created`)
          } else {
            notifyError(`User not created`)
          }
          return res.created
        })
        .catch((err) => {
          notifyError(err.message)
          return undefined
        }),
    deleteUser: (userId: string) =>
      sdk.adminDeleteUser({ userId }).then(() => {
        notifySuccess('User deleted')
        return query.refetch()
      }),
    query,
    role,
    setRole,
    setSearch,
    setStatus,
    status,
    pagination: useUiPagination({
      skip,
      setSkip,
      take,
      setTake,
      total,
    }),
  }
}
