import { useWebSdk } from '@pubkey-collections/web/shell/data-access'
import { notifyError, notifySuccess } from '@pubkey-collections/web/ui/notifications'
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
            notifySuccess('Interest added')
            return !!res.data
          }
          notifyError('Interest not added')
          return false
        })
        .catch((err) => {
          notifyError(err.message)
          return false
        }),
    removeInterest: (interestId: string) =>
      sdk
        .userRemoveInterest({ interestId })
        .then(async (res) => {
          await userGetInterestsQuery.refetch()
          if (res.data) {
            notifySuccess('Interest removed')
            return !!res.data
          }
          notifyError('Interest not removed')
          return false
        })

        .catch((err) => {
          notifyError(err.message)
          return false
        }),
  }
}
