import { lazy } from 'react'
import { useRoutes } from 'react-router-dom'

const WebAuthLoginFeature = lazy(() => import('./web-auth-login.feature'))
const WebAuthRegisterFeature = lazy(() => import('./web-auth-register.feature'))

export function WebAuthRoutes() {
  return useRoutes([
    { path: 'login', element: <WebAuthLoginFeature /> },
    { path: 'register', element: <WebAuthRegisterFeature /> },
  ])
}
