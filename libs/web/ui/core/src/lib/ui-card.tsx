import { Paper, PaperProps, Skeleton, Title } from '@mantine/core'
import { useUiTheme } from './theme'

export interface UiCardProps extends PaperProps {
  loading?: boolean
  title?: string
}
export function UiCard({ loading = false, title, ...props }: UiCardProps) {
  const { isSmall } = useUiTheme()

  return (
    <Paper p={isSmall ? 'xs' : 'md'} withBorder {...props}>
      {title ? (
        <Title order={3} mb={isSmall ? 'xs' : 'md'}>
          {title}
        </Title>
      ) : null}
      <Skeleton visible={loading}>{props.children}</Skeleton>
    </Paper>
  )
}
