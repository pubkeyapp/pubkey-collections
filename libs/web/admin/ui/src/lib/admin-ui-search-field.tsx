import { TextInput } from '@mantine/core'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

export function AdminUiSearchField({
  placeholder = 'Search...',
  setSearch,
}: {
  placeholder?: string
  setSearch: (query: string) => void
}) {
  const [value, setValue] = useState<string>('')

  return (
    <TextInput
      sx={{ flexGrow: 1 }}
      placeholder={placeholder}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          setSearch(value.trim())
        }
      }}
    />
  )
}
