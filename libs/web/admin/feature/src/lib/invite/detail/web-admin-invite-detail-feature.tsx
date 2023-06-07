import { useAdminInvite } from '@pubkey-collections/web/admin/data-access'
import { AdminUiBack, AdminUiPage } from '@pubkey-collections/web/admin/ui'
import { UiError, UiLoader, UiTabRoutes } from '@pubkey-collections/web/ui/core'

import { useParams } from 'react-router-dom'

import { WebAdminInviteOverviewTab } from './web-admin-invite-overview.tab'
import { WebAdminInviteSettingsTab } from './web-admin-invite-settings.tab'

export function WebAdminInviteDetailFeature() {
  const { inviteId } = useParams<{ inviteId: string }>() as { inviteId: string }
  const { updateInvite, query, invite } = useAdminInvite(inviteId)

  if (query.error) {
    return <UiError message={query.error.toString()} />
  }
  if (query.isLoading) {
    return <UiLoader />
  }

  if (!invite) {
    return <UiError message="Invite not found" />
  }

  return invite ? (
    <AdminUiPage title={`${invite?.code}`} leftAction={<AdminUiBack />}>
      <UiTabRoutes
        tabs={[
          { label: 'Overview', value: 'overview', component: <WebAdminInviteOverviewTab invite={invite} /> },
          {
            label: 'Settings',
            value: 'settings',
            component: <WebAdminInviteSettingsTab invite={invite} updateInvite={updateInvite} />,
          },
        ]}
      />
    </AdminUiPage>
  ) : (
    <AdminUiPage title="Invite">
      <UiError message="Invite not found" />
    </AdminUiPage>
  )
}
