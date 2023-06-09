import { ActionIcon, TextInput, TextInputProps } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { ChangeEvent, KeyboardEvent } from 'react'

export interface UiSearchFieldProps extends TextInputProps {
  onSearch: () => void
  setValue: (value: string) => void
  value: string
}

export function UiSearchField({ setValue, onSearch, placeholder, value, ...props }: UiSearchFieldProps) {
  return (
    <TextInput
      sx={{ flexGrow: 1 }}
      placeholder={placeholder}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
      onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          onSearch()
        }
      }}
      rightSection={
        <ActionIcon variant="filled" onClick={() => onSearch()}>
          <IconSearch size={16} />
        </ActionIcon>
      }
      {...props}
    />
  )
}
