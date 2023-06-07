import { ActionIcon } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { Link } from 'react-router-dom'

export function UiBack() {
  return (
    <ActionIcon color="brand" component={Link} to="../">
      <IconArrowLeft />
    </ActionIcon>
  )
}
