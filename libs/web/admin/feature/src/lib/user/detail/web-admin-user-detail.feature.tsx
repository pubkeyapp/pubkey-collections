import { useAdminUser } from '@pubkey-collections/web/admin/data-access'
import { AdminUiBack, AdminUiPage } from '@pubkey-collections/web/admin/ui'
import { UiError, UiLoader, UiStack, UiTabRoutes } from '@pubkey-collections/web/ui/core'
import { useParams } from 'react-router-dom'
import { WebAdminUserDetailEmailsTab } from './web-admin-user-detail-emails.tab'
import { WebAdminUserDetailIdentitiesTab } from './web-admin-user-detail-identities.tab'
import { WebAdminUserDetailNotificationsTab } from './web-admin-user-detail-notifications.tab'
import { WebAdminUserDetailSettingsTab } from './web-admin-user-detail-settings.tab'

export function WebAdminUserDetailFeature() {
  const { userId } = useParams<{ userId: string }>() as { userId: string }
  const { query, user } = useAdminUser(userId)

  return (
    <AdminUiPage leftAction={<AdminUiBack />} title={user?.username ?? '...'}>
      <UiStack>
        {query.isLoading ? (
          <UiLoader />
        ) : user ? (
          <UiTabRoutes
            tabs={[
              {
                value: 'settings',
                label: 'Settings',
                component: <WebAdminUserDetailSettingsTab userId={userId} />,
              },
              {
                value: 'emails',
                label: 'Emails',
                component: <WebAdminUserDetailEmailsTab userId={userId} />,
              },
              {
                value: 'identities',
                label: 'Identities',
                component: <WebAdminUserDetailIdentitiesTab userId={userId} />,
              },
              {
                value: 'notifications',
                label: 'Notifications',
                component: <WebAdminUserDetailNotificationsTab userId={userId} />,
              },
            ]}
          />
        ) : (
          <UiError message="User not found" />
        )}
      </UiStack>
    </AdminUiPage>
  )
}
