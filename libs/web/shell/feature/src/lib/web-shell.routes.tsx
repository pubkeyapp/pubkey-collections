import { Button, Container, Group, Text } from '@mantine/core'
import { useCluster } from '@pubkey-collections/web/shell/data-access'
import { UiCard, UiNotFound, UiStack } from '@pubkey-collections/web/ui/core'
import { showNotificationError, showNotificationSuccess } from '@pubkey-collections/web/ui/notifications'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { useGuardedRoutes } from './use-guarded-routes'

export const LazyCollectionFeature = lazy(() => import('@pubkey-collections/web/collection/feature'))

export function WebShellRoutes() {
  return useGuardedRoutes({
    index: 'collections',
    layout: [
      // Here you can add routes that are part of the main layout
      { path: '/collections/*', element: <LazyCollectionFeature /> },
      { path: '/settings/*', element: <SettingsFeature /> },
    ],
    root: [
      // Routes for the 404 page
      { path: '/404', element: <UiNotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  })
}

export function SettingsFeature() {
  const { cluster, setCluster, reset, isDefault } = useCluster()
  const update = () => {
    const newCluster = prompt('Enter new cluster', cluster)
    if (newCluster) {
      setCluster(newCluster)
      showNotificationSuccess(`Cluster updated to ${newCluster}`)
    } else {
      showNotificationError(`Cluster not updated`)
    }
  }

  const cleanCluster = cluster.replace('https://', '').split('?')[0].replace(/\/$/, '')

  return (
    <UiStack>
      <Container>
        <UiCard title="Settings" miw={500}>
          <Group position="apart">
            <Text>Solana Cluster</Text>
            <Group spacing="xs">
              <Button disabled={isDefault} size="xs" onClick={reset}>
                Set to default
              </Button>
              <Button size="xs" variant="light" onClick={update}>
                {cleanCluster}
              </Button>
            </Group>
          </Group>
        </UiCard>
      </Container>
    </UiStack>
  )
}
