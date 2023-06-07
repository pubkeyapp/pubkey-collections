import { useRoutes } from 'react-router-dom'
import { WebAdminUserDetailFeature } from './detail/web-admin-user-detail.feature'
import { WebAdminUserCreateFeature } from './web-admin-user-create.feature'
import { WebAdminUserListFeature } from './web-admin-user-list.feature'

export function WebAdminUserRoutes() {
  return useRoutes([
    { path: '', element: <WebAdminUserListFeature /> },
    {
      path: 'create',
      element: <WebAdminUserCreateFeature />,
    },
    { path: ':userId/*', element: <WebAdminUserDetailFeature /> },
  ])
}

export default WebAdminUserRoutes
