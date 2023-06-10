import { SimpleGrid, Stack, Title } from '@mantine/core'
import { UiAlert, UiCard, UiStack } from '@pubkey-collections/web/ui/core'
import { CollectionCombo, sortCollectionItems } from '@pubkeyapp/collections'
import React from 'react'
import { CollectionItemGroup } from './collection-item-group'
import { CollectionItemImage } from './collection-item-image'

import { CollectionTraitGroup } from './collection-trait-group'

export function CollectionCombos({ combos }: { combos: CollectionCombo[] }) {
  return (
    <UiStack>
      <SimpleGrid
        breakpoints={[
          { minWidth: 'sm', cols: 3 },
          { minWidth: 'md', cols: 3 },
        ]}
      >
        {combos.map((combo) => (
          <UiCard key={combo.name} withBorder={false}>
            <Stack align="center">
              <Title order={4}>{combo.name}</Title>
              <CollectionTraitGroup
                position="center"
                spacing="xs"
                buttonSize="xs"
                withLabel
                traits={combo.traits}
                selected={combo.traits}
              />
              {combo.items?.length ? (
                combo.group ? (
                  <CollectionItemImage item={combo.items[0]} width={110} />
                ) : (
                  <CollectionItemGroup items={sortCollectionItems(combo.items, combo.sortKey)} width={110} />
                )
              ) : (
                <UiAlert message={`No items found for combo ${combo.name}`} />
              )}
            </Stack>
          </UiCard>
        ))}
      </SimpleGrid>
    </UiStack>
  )
}
