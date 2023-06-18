import { AdminFindNotificationsInput, Notification } from '@pubkey-collections/sdk'
import { useWebSdk } from '@pubkey-collections/web/shell/data-access'
import { notifyError, notifySuccess } from '@pubkey-collections/web/ui/notifications'

import { useUiPagination } from '@pubkey-collections/web/ui/core'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminUserNotifications(userId: string) {
  const sdk = useWebSdk()
  const [search, setSearch] = useState('')
  const [skip, setSkip] = useState(0)
  const [take, setTake] = useState(10)

  const input: AdminFindNotificationsInput = {
    owner: userId,
    search,
    skip,
    take,
  }
  const query = useQuery(['admin', 'notifications', input], () => {
    return sdk.adminFindNotifications({ input }).then((res) => res.data)
  })

  const total = query.data?.count?.total ?? 0

  return {
    query,
    setSearch,
    pagination: useUiPagination({
      skip,
      setSkip,
      take,
      setTake,
      total,
    }),
    deleteNotification: (notification: Notification) => {
      return sdk
        .adminDeleteNotification({ notificationId: notification.id })
        .then(() => query.refetch())
        .catch((err) => notifyError(err.message))
    },
    poke: () => {
      return sdk
        .userPoke({ pokeId: userId })
        .then((res) => res.data)
        .then((res) => {
          notifySuccess(res.poked ? 'Poked' : 'Failed to poke')
          return query.refetch()
        })
        .catch((err) => notifyError(err.message))
    },
  }
}
