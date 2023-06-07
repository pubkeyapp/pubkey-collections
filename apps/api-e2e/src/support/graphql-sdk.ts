import { getGraphQLSdk, Sdk } from '@pubkey-collections/sdk'
import { getApiUrl } from './get-api.url'

export const sdk: Sdk = getGraphQLSdk(getApiUrl('/graphql'))

export async function getUserCookie(username: string, password: string) {
  const res = await sdk.login({
    input: { username, password },
  })

  return res.headers.get('set-cookie')
}
