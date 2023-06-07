import { useAdminIdentity } from '@pubkey-collections/web/admin/data-access'
import { AdminUiIdentityTable, AuthUiIdentityCreateForm } from '@pubkey-collections/web/admin/ui'
import { UiAlert, UiLoader, UiStack } from '@pubkey-collections/web/ui/core'
import { Button, Group } from '@mantine/core'
import { modals } from '@mantine/modals'

export function WebAdminUserDetailIdentitiesTab({ userId }: { userId: string }) {
  const { identities, createIdentity, deleteIdentity, query } = useAdminIdentity(userId)

  if (query.isLoading) return <UiLoader />

  return (
    <UiStack>
      {identities?.length ? (
        <AdminUiIdentityTable identities={identities ?? []} deleteIdentity={deleteIdentity} />
      ) : (
        <UiAlert message="No identities found" />
      )}
      <Group position="right">
        <Button
          onClick={() => {
            modals.open({
              title: 'Add Identity',
              children: <AuthUiIdentityCreateForm submit={createIdentity} />,
            })
          }}
        >
          Add Identity
        </Button>
      </Group>
    </UiStack>
  )
}
