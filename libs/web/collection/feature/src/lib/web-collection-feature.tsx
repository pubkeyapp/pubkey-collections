import { Container } from '@mantine/core'
import { useUiTheme } from '@pubkey-collections/web/ui/core'
import { collections } from '@pubkeyapp/collections'
import { CollectionGrid } from '@pubkey-collections/web/collection/ui'
import { Route, Routes } from 'react-router-dom'
import { WebCollectionDetail } from './web-collection-detail-feature'

export function WebCollectionFeature() {
  const { isSmall } = useUiTheme()
  return (
    <Routes>
      <Route
        index
        element={
          isSmall ? (
            <CollectionGrid items={collections} />
          ) : (
            <Container size="lg">
              <CollectionGrid items={collections} />
            </Container>
          )
        }
      />
      <Route path=":collectionId/*" element={<WebCollectionDetail />} />
    </Routes>
  )
}
