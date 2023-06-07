import { UiContainer, UiDashboard } from '@pubkey-collections/web/ui/core'
import { IconSend, IconUsers } from '@tabler/icons-react'

export function WebAdminDashboardFeature() {
  return (
    <UiContainer>
      <UiDashboard
        links={[
          { label: 'Invites', icon: IconSend, link: '/admin/invites' },
          { label: 'Users', icon: IconUsers, link: '/admin/users' },
        ]}
      />
    </UiContainer>
  )
}

export default WebAdminDashboardFeature
