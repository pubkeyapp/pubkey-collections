import { TextInput, TextInputProps } from '@mantine/core'
import { ChangeEvent, KeyboardEvent, useState } from 'react'

export interface UiSearchFieldProps extends TextInputProps {
  setSearch: (query: string) => void
}

export function UiSearchField({ placeholder = 'Search...', setSearch }: UiSearchFieldProps) {
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
