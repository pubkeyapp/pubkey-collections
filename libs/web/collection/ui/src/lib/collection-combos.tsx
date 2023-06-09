import { Stack, Title } from '@mantine/core'
import { UiAlert, UiCard, UiStack } from '@pubkey-collections/web/ui/core'
import { CollectionCombo, sortCollectionItems } from '@pubkeyapp/collections'
import React from 'react'
import { CollectionItemGroup } from './collection-item-group'

import { CollectionTraitGroup } from './collection-trait-group'

export function CollectionCombos({ combos }: { combos: CollectionCombo[] }) {
  return (
    <UiStack>
      {combos.map((combo) => (
        <UiCard key={combo.name}>
          <Stack>
            <Title order={4}>{combo.name}</Title>
            <CollectionTraitGroup withLabel traits={combo.traits} />
            {combo.items?.length ? (
              <CollectionItemGroup items={sortCollectionItems(combo.items, combo.sortKey)} width={120} />
            ) : (
              <UiAlert message={`No items found for combo ${combo.name}`} />
            )}
          </Stack>
        </UiCard>
      ))}
    </UiStack>
  )
}
