import { UiCard, UiContainer, UiGroup, UiStack } from '@pubkey-collections/web/ui/core'
import { Group, Title } from '@mantine/core'
import { ReactNode } from 'react'

export function AdminUiPage({
  children,
  leftAction,
  rightAction,
  title,
}: {
  children: ReactNode
  leftAction?: ReactNode
  rightAction?: ReactNode
  title?: string
}) {
  return (
    <UiContainer>
      <UiStack>
        <UiCard>
          <UiGroup>
            <Group>
              {leftAction ? leftAction : null}
              <Title>{title ?? ''}</Title>
            </Group>
            {rightAction ? <Group>{rightAction}</Group> : null}
          </UiGroup>
        </UiCard>
        {children}
      </UiStack>
    </UiContainer>
  )
}
