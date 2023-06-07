import { Route, Routes } from 'react-router-dom'
import { WebAdminInviteCreateFeature } from './web-admin-invite-create.feature'
import { WebAdminInviteDetailFeature } from './detail/web-admin-invite-detail-feature'
import { WebAdminInviteListFeature } from './web-admin-invite-list.feature'

export function WebAdminInviteRoutes() {
  return (
    <Routes>
      <Route index element={<WebAdminInviteListFeature />} />
      <Route path="create" element={<WebAdminInviteCreateFeature />} />
      <Route path=":inviteId/*" element={<WebAdminInviteDetailFeature />} />
    </Routes>
  )
}

export default WebAdminInviteRoutes
