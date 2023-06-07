import { useAdminInvites } from '@pubkey-collections/web/admin/data-access'
import { AdminUiBack, AdminUiInviteTable, AdminUiPage } from '@pubkey-collections/web/admin/ui'

import { UiAlert, UiCard, UiLoader, UiPagination, UiSearchField, UiStack } from '@pubkey-collections/web/ui/core'
import { Button } from '@mantine/core'
import { Link } from 'react-router-dom'

export function WebAdminInviteListFeature() {
  const { query, invites, pagination, setSearch, deleteInvite } = useAdminInvites()

  return (
    <AdminUiPage
      title="Invites"
      leftAction={<AdminUiBack />}
      rightAction={
        <Button component={Link} to="create">
          Create
        </Button>
      }
    >
      <UiStack>
        <UiCard>
          <UiSearchField placeholder="Search invite" setSearch={setSearch} />
        </UiCard>

        {query.isLoading ? (
          <UiLoader />
        ) : invites?.length ? (
          <AdminUiInviteTable
            invites={invites}
            deleteInvite={(invite) => {
              if (!window.confirm('Are you sure?')) return
              return deleteInvite(invite.id)
            }}
          />
        ) : (
          <UiAlert message="No invites found" />
        )}

        <UiCard>
          <UiPagination pagination={pagination} />
        </UiCard>
      </UiStack>
    </AdminUiPage>
  )
}
