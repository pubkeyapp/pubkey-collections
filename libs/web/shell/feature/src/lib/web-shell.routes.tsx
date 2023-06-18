import { UiNotFound } from '@pubkey-collections/web/ui/core'
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'
import { useGuardedRoutes } from './use-guarded-routes'

export const LazyAdminFeature = lazy(() => import('@pubkey-collections/web/admin/feature'))
export const LazyAuthFeature = lazy(() => import('@pubkey-collections/web/auth/feature'))
export const LazyDashboardFeature = lazy(() => import('@pubkey-collections/web/dashboard/feature'))
export const LazyNotificationFeature = lazy(() => import('@pubkey-collections/web/notification/feature'))
export const LazyProfileFeature = lazy(() => import('@pubkey-collections/web/profile/feature'))
export const LazySettingsFeature = lazy(() => import('@pubkey-collections/web/settings/feature'))

export function WebShellRoutes() {
  return useGuardedRoutes({
    index: 'dashboard',
    admin: [
      // Here you can add routes that are only accessible by admins under the /admin/* path
      // Visit /admin/custom-admin-page to see this route
      { path: 'custom-admin-page', element: <div>CUSTOM ADMIN PAGE HERE</div> },
      { path: '*', element: <LazyAdminFeature /> },
    ],
    layout: [
      // Here you can add routes that are part of the main layout
      { path: '/dashboard', element: <LazyDashboardFeature /> },
      { path: '/notifications/*', element: <LazyNotificationFeature /> },
      { path: '/profile/*', element: <LazyProfileFeature /> },
      { path: '/u/*', element: <LazyProfileFeature /> },
      { path: '/settings/*', element: <LazySettingsFeature /> },
    ],
    full: [
      // Here you can add routes that are not part of the main layout, visit /custom-full-page to see this route
      { path: 'custom-full-page', element: <div>CUSTOM FULL PAGE</div> },
    ],
    root: [
      // Routes for the auth feature
      { path: '/auth/*', element: <LazyAuthFeature /> },
      // Routes for the 404 page
      { path: '/404', element: <UiNotFound /> },
      { path: '*', element: <Navigate to="/404" replace /> },
    ],
  })
}
