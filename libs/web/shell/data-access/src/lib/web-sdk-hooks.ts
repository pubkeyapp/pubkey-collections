import { Sdk } from '@pubkey-collections/sdk'
import { useQuery } from '@tanstack/react-query'

export function useMeQuery(sdk: Sdk) {
  return useQuery(
    ['me'],
    async () => {
      try {
        const me = await sdk.me()
        console.log(`useMeQuery: logged in as ${me.data.me?.username}`)
        return me
      } catch (error) {
        console.log(`useMeQuery: Not authenticated.`)
        return null
      }
    },
    {
      retry: 0,
    },
  )
}
