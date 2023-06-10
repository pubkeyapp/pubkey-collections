import { Tabs, TabsProps } from '@mantine/core'
import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { UiAlert, useUiTheme } from '@pubkey-collections/web/ui/core'

import { CollectionStats } from './collection-stats'
import { CollectionTabCombos } from './collection-tab-combos'
import { CollectionTabCommon } from './collection-tab-common'
import { CollectionTabGallery } from './collection-tab-gallery'

export function CollectionTabs({ ...props }: Omit<TabsProps, 'children'>) {
  const { isSmall } = useUiTheme()
  const { collection, items, wallet } = useCollection()

  if (!wallet.address) {
    return <UiAlert title="Wallet not found" message="Please check the URL" />
  }

  if (!items.length) {
    return <UiAlert message={`No ${collection?.name} items found for ${wallet?.address}`} />
  }

  return (
    <Tabs defaultValue="gallery" {...props}>
      <Tabs.List grow={isSmall}>
        <Tabs.Tab value="gallery">Gallery</Tabs.Tab>
        <Tabs.Tab value="common">Common</Tabs.Tab>
        <Tabs.Tab value="combos">Combos</Tabs.Tab>
        <Tabs.Tab value="stats">Stats</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="gallery" pt="md">
        <CollectionTabGallery />
      </Tabs.Panel>

      <Tabs.Panel value="common" pt="md">
        <CollectionTabCommon />
      </Tabs.Panel>

      <Tabs.Panel value="combos" pt="md">
        <CollectionTabCombos />
      </Tabs.Panel>

      <Tabs.Panel value="stats" pt="md">
        <CollectionStats />
      </Tabs.Panel>
    </Tabs>
  )
}
