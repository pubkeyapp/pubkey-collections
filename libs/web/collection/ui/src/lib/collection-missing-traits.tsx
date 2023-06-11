import { Anchor, Button, Group, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { UiStack } from '@pubkey-collections/web/ui/core'
import React from 'react'
import { CollectionTraitGroup } from './collection-trait-group'

export function CollectionMissingTraits() {
  const { collection, missingTraits, traits } = useCollection()
  const userTraits = Object.keys(traits).flatMap((key) => traits[key])
  return missingTraits?.length ? (
    <Button
      size="xs"
      variant="light"
      color="yellow"
      sx={{ cursor: 'pointer' }}
      onClick={() =>
        modals.open({
          centered: true,
          size: 'lg',
          title: 'Missing traits',
          children: (
            <UiStack align="center" spacing="xl">
              <CollectionTraitGroup buttonSize="lg" traits={missingTraits} withLabel position="center" />
              {collection?.marketplace ? (
                <Group position="center">
                  <Button
                    uppercase
                    variant="light"
                    component={'a'}
                    href={collection.marketplace}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Buy missing traits
                  </Button>
                </Group>
              ) : null}
            </UiStack>
          ),
        })
      }
    >
      Missing traits
    </Button>
  ) : (
    <Button
      size="xs"
      variant="light"
      color="green"
      sx={{ cursor: 'pointer' }}
      onClick={() =>
        modals.open({
          centered: true,
          size: 'lg',
          title: 'All traits collected',
          children: (
            <Text>
              This collection has all <b>{userTraits.length}</b> traits.
            </Text>
          ),
        })
      }
    >
      All traits collected
    </Button>
  )
}
