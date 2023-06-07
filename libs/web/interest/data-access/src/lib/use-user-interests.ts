import { useWebSdk } from '@pubkey-collections/web/shell/data-access'
import { showNotificationError, showNotificationSuccess } from '@pubkey-collections/web/ui/notifications'
import { useQuery } from '@tanstack/react-query'

export function useUserInterests() {
  const sdk = useWebSdk()

  const userFindInterestsQuery = useQuery(['user', 'interests', 'find'], () =>
    sdk.userFindInterests().then((res) => res.data),
  )
  const userGetInterestsQuery = useQuery(['user', 'interests', 'get'], () =>
    sdk.userGetInterests().then((res) => res.data),
  )
  const interests = userFindInterestsQuery.data?.items ?? []
  const active = userGetInterestsQuery.data?.items ?? []
  const activeIds = active.map((interest) => interest.id)

  return {
    interests,
    activeIds,
    loading: userFindInterestsQuery.isLoading || userGetInterestsQuery.isLoading,
    addInterest: (interestId: string) =>
      sdk
        .userAddInterest({ interestId })
        .then(async (res) => {
          await userGetInterestsQuery.refetch()
          if (res.data) {
            showNotificationSuccess('Interest added')
            return !!res.data
          }
          showNotificationError('Interest not added')
          return false
        })
        .catch((err) => {
          showNotificationError(err.message)
          return false
        }),
    removeInterest: (interestId: string) =>
      sdk
        .userRemoveInterest({ interestId })
        .then(async (res) => {
          await userGetInterestsQuery.refetch()
          if (res.data) {
            showNotificationSuccess('Interest removed')
            return !!res.data
          }
          showNotificationError('Interest not removed')
          return false
        })

        .catch((err) => {
          showNotificationError(err.message)
          return false
        }),
  }
}
