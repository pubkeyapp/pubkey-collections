import { Group, Title } from '@mantine/core'
import { UiFull, UiLoader, UiStack, useUiTheme } from '@pubkey-collections/web/ui/core'
import { Collection } from '@pubkeyapp/collections'
import React, { ReactNode } from 'react'
import { CollectionHeader } from './collection-header'

export function CollectionPanel({
  collection,
  children,
  loader,
  title,
}: {
  collection: Collection
  children?: ReactNode
  loader?: boolean
  title?: string
}) {
  const { isSmall } = useUiTheme()
  return (
    <UiFull>
      <UiStack align="center" spacing={isSmall ? 32 : 64}>
        <Group position="center">
          <CollectionHeader collection={collection} />
        </Group>
        {title ? (
          <Title align="center" order={isSmall ? 4 : 3}>
            {title}
          </Title>
        ) : null}
        {children}
        {loader ? <UiLoader /> : null}
      </UiStack>
    </UiFull>
  )
}
