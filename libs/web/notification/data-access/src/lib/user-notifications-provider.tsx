import { Notification, UserFindNotificationsInput } from '@pubkey-collections/sdk'
import { useWebSdk } from '@pubkey-collections/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-collections/web/ui/notifications'

import { useUiPagination } from '@pubkey-collections/web/ui/core'
import { useQuery } from '@tanstack/react-query'
import { createContext, ReactNode, useContext, useState } from 'react'

export interface UserNotificationsProviderContext {
  notifications: Notification[]
  search: string
  setSearch: (search: string) => void
  unreadCount: number
  pagination: ReturnType<typeof useUiPagination>
  markRead: (notification: Notification) => Promise<boolean>
  markAllRead: () => Promise<boolean>
  poke: (pokeId: string) => Promise<boolean>
}

const UserNotificationsContext = createContext<UserNotificationsProviderContext>({} as UserNotificationsProviderContext)

export function UserNotificationsProvider({ children }: { children: ReactNode }) {
  const sdk = useWebSdk()

  const [take, setTake] = useState(10)
  const [skip, setSkip] = useState(0)
  const [search, setSearch] = useState<string>('')

  const input: UserFindNotificationsInput = {
    skip,
    take,
    search,
  }

  const query = useQuery(['user', 'notifications', input], () =>
    sdk.userFindNotifications({ input }).then((res) => res.data),
  )
  const total = query.data?.count?.total ?? 0

  const notifications = (query.data?.items ?? []) as Notification[]
  const unreadCount = notifications.filter((item) => !item.read).length

  const value: UserNotificationsProviderContext = {
    notifications,
    search,
    setSearch,
    unreadCount,
    pagination: useUiPagination({
      skip,
      setSkip,
      take,
      setTake,
      total,
    }),
    markRead: (notification: Notification) => {
      if (notification.read) return Promise.resolve(true)
      return sdk
        .userReadNotification({ notificationId: notification.id })
        .then(() => query.refetch())
        .then(() => true)
        .catch((err) => {
          showNotificationError(err?.message)
          return false
        })
    },
    markAllRead: () =>
      sdk
        .userReadAllNotifications()
        .then(() => query.refetch())
        .then(() => true)
        .catch((err) => {
          showNotificationError(err?.message)
          return false
        }),
    poke: (pokeId: string) =>
      sdk
        .userPoke({ pokeId })
        .then((res) => {
          return res.data.poked ? showNotificationSuccess('Poked') : showNotificationError('Already poked')
        })
        .then(() => query.refetch())
        .then(() => true)
        .catch((err) => {
          showNotificationError(err?.message)
          return false
        }),
  }

  return <UserNotificationsContext.Provider value={value}>{children}</UserNotificationsContext.Provider>
}

export const useUserNotifications = () => useContext(UserNotificationsContext)
