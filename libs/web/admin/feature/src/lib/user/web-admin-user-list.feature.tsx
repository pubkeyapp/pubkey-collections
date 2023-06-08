import { Button, Group, Select } from '@mantine/core'
import { User, UserRole, UserStatus } from '@pubkey-collections/sdk'
import { useAdminUsers } from '@pubkey-collections/web/admin/data-access'
import {
  AdminUiBack,
  AdminUiPage,
  AdminUiUserTable,
  userRoleOptions,
  userStatusOptions,
} from '@pubkey-collections/web/admin/ui'
import { UiAlert, UiCard, UiLoader, UiPagination, UiSearchField, UiStack } from '@pubkey-collections/web/ui/core'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export function WebAdminUserListFeature() {
  const { deleteUser, pagination, query, role, setRole, setSearch, setStatus, status } = useAdminUsers()
  const [queryValue, setQueryValue] = useState('')
  return (
    <AdminUiPage
      title="Users"
      leftAction={<AdminUiBack />}
      rightAction={
        <Button component={Link} to="create">
          Create
        </Button>
      }
    >
      <UiStack>
        <UiCard>
          <Group>
            <UiSearchField onSearch={() => setSearch(queryValue)} value={queryValue} setValue={setQueryValue} />
            <Select
              value={role?.toString() ?? ''}
              onChange={(role) => {
                pagination.setSkip(0)
                setRole(role === '' ? undefined : (role as UserRole))
              }}
              data={[{ value: '', label: 'Filter by role' }, ...userRoleOptions()]}
            />
            <Select
              value={status?.toString() ?? ''}
              onChange={(status) => {
                pagination.setSkip(0)
                setStatus(status === '' ? undefined : (status as UserStatus))
              }}
              data={[{ value: '', label: 'Filter by status' }, ...userStatusOptions()]}
            />
          </Group>
        </UiCard>

        {query.isLoading ? (
          <UiLoader />
        ) : query?.data?.items?.length ? (
          <AdminUiUserTable
            deleteUser={(user) => {
              if (!window.confirm('Are you sure?')) return
              return deleteUser(user.id)
            }}
            users={query?.data?.items as User[]}
          />
        ) : (
          <UiAlert message="User not found" />
        )}

        <UiCard>
          <UiPagination pagination={pagination} />
        </UiCard>
      </UiStack>
    </AdminUiPage>
  )
}
