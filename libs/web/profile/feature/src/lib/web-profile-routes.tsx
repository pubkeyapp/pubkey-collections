import { useWebAuth } from '@pubkey-collections/web/auth/data-access'
import { UiWarn } from '@pubkey-collections/web/ui/core'
import { Navigate, Route, Routes } from 'react-router-dom'
import { WebProfileDetailFeature } from './web-profile-detail.feature'

export function WebProfileRoutes() {
  const { user } = useWebAuth()

  if (!user?.username) {
    return <UiWarn message="User not found" />
  }

  return (
    <Routes>
      <Route index element={<Navigate to={user.username} replace />} />
      <Route path=":username" element={<WebProfileDetailFeature />} />
    </Routes>
  )
}
