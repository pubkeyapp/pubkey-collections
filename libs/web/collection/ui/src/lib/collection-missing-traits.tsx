import { Button, Text } from '@mantine/core'
import { modals } from '@mantine/modals'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import React from 'react'
import { CollectionTraitGroup } from './collection-trait-group'

export function CollectionMissingTraits() {
  const { missingTraits, traits } = useCollection()
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
          children: <CollectionTraitGroup buttonSize="lg" traits={missingTraits} withLabel />,
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
