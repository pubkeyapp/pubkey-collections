import { Anchor, Avatar, Flex, Group, SimpleGrid, Stack, Title } from '@mantine/core'
import { UiStack } from '@pubkey-collections/web/ui/core'
import { CollectionCombo, Links, sortCollectionItems } from '@pubkeyapp/collections'
import { IconBrandDiscord, IconBrandTwitter, IconHome, IconPhotoQuestion } from '@tabler/icons-react'
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
          <Flex direction="column" justify="space-between" align="center" key={combo.id}>
            {combo.name ? (
              <Group spacing={6} mih={50} align="center">
                <Title order={4}>{combo.name}</Title>
                {combo.links ? <ComboLinks links={combo.links} /> : null}
              </Group>
            ) : null}
            <Stack
              align="center"
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexGrow: 1,
              }}
            >
              <Group mih={50}>
                <CollectionTraitGroup
                  position="center"
                  spacing="xs"
                  buttonSize="xs"
                  withLabel
                  traits={combo.traits}
                  selected={combo.traits}
                />
              </Group>
              <Stack sx={{ flexGrow: 1 }} mb="xl">
                {combo.items?.length ? (
                  combo.group ? (
                    <CollectionItemImage item={combo.items[0]} width={110} />
                  ) : (
                    <CollectionItemGroup items={sortCollectionItems(combo.items, combo.sortKey)} width={110} />
                  )
                ) : (
                  <UiStack>
                    <Avatar color="brand" size={110}>
                      <IconPhotoQuestion size={40} />
                    </Avatar>
                  </UiStack>
                )}
              </Stack>
            </Stack>
          </Flex>
        ))}
      </SimpleGrid>
    </UiStack>
  )
}

export function ComboLinks({ links }: { links: Links }) {
  return (
    <Group spacing={2}>
      {links.homepage ? (
        <Anchor color="dimmed" href={links.homepage} target="_blank" rel="noopener noreferrer">
          <IconHome size={16} />
        </Anchor>
      ) : null}
      {links.discord ? (
        <Anchor color="dimmed" href={links.discord} target="_blank" rel="noopener noreferrer">
          <IconBrandDiscord size={16} />
        </Anchor>
      ) : null}
      {links.twitter ? (
        <Anchor color="dimmed" href={links.twitter} target="_blank" rel="noopener noreferrer">
          <IconBrandTwitter size={16} />
        </Anchor>
      ) : null}
    </Group>
  )
}
