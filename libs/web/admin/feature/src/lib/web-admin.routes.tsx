import { lazy } from 'react'
import { Navigate, useRoutes } from 'react-router-dom'

const WebAdminDashboardFeature = lazy(() => import('./web-admin-dashboard.feature'))
const WebAdminInviteRoutes = lazy(() => import('./invite/web-admin-invite.routes'))
const WebAdminUserRoutes = lazy(() => import('./user/web-admin-user.routes'))

export function WebAdminRoutes() {
  return useRoutes([
    { index: true, element: <Navigate to="dashboard" replace /> },
    { path: 'dashboard/*', element: <WebAdminDashboardFeature /> },
    { path: 'invites/*', element: <WebAdminInviteRoutes /> },
    { path: 'users/*', element: <WebAdminUserRoutes /> },
  ])
}
