import { UiSearchField, useUiTheme } from '@pubkey-collections/web/ui/core'
import { useState } from 'react'

export function CollectionSearch({ handleSearch, value }: { handleSearch: (query: string) => void; value: string }) {
  const [query, setQuery] = useState(value)
  const { isSmall } = useUiTheme()
  return (
    <UiSearchField
      placeholder="Wallet address or name"
      size={isSmall ? undefined : 'xl'}
      width={isSmall ? '50px' : undefined}
      value={query}
      setValue={setQuery}
      onSearch={() => handleSearch(query.trim())}
    />
  )
}
