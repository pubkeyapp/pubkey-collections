import { collections } from '@pubkey-collections/web/collection/data-access'
import { CollectionGrid } from '@pubkey-collections/web/collection/ui'
import { Route, Routes } from 'react-router-dom'
import { WebCollectionDetail } from './web-collection-detail-feature'

export function WebCollectionFeature() {
  return (
    <Routes>
      <Route index element={<CollectionGrid items={collections} link />} />
      <Route path=":collectionId" element={<WebCollectionDetail />} />
    </Routes>
  )
}
