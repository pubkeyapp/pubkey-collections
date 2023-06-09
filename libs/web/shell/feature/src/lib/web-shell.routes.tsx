import { UiNotFound } from '@pubkey-collections/web/ui/core'
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
    ],
    root: [
      // Routes for the 404 page
      { path: '/404', element: <UiNotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  })
}
