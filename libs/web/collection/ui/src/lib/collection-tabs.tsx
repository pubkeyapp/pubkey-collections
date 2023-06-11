import { useCollection } from '@pubkey-collections/web/collection/data-access'
import { UiAlert, UiTabRoutes, useUiTheme } from '@pubkey-collections/web/ui/core'

import { CollectionStats } from './collection-stats'
import { CollectionTabCombos } from './collection-tab-combos'
import { CollectionTabCommon } from './collection-tab-common'
import { CollectionTabGallery } from './collection-tab-gallery'

export function CollectionTabs() {
  const { isSmall } = useUiTheme()
  const { collection, items, wallet } = useCollection()

  if (!wallet.address) {
    return <UiAlert title="Wallet not found" message="Please check the URL" />
  }

  if (!items.length) {
    return <UiAlert message={`No ${collection?.name} items found for ${wallet?.address}`} />
  }

  return (
    <UiTabRoutes
      grow={isSmall}
      tabs={[
        { value: 'gallery', label: 'Gallery', component: <CollectionTabGallery /> },
        { value: 'common', label: 'Common', component: <CollectionTabCommon /> },
        { value: 'combos', label: 'Combos', component: <CollectionTabCombos /> },
        { value: 'stats', label: 'Stats', component: <CollectionStats /> },
      ]}
    />
  )
}
