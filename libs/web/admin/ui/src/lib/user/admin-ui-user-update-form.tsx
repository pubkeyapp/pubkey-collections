import { AdminUpdateUserInput, User, UserRole, UserStatus } from '@pubkey-collections/sdk'
import { formFieldCheckbox, formFieldSelect, formFieldText, UiForm, UiFormField } from '@pubkey-collections/web/ui/core'
import { Button, Group } from '@mantine/core'

export interface AuthUiUpdateUserFormProps {
  submit: (res: AdminUpdateUserInput) => Promise<boolean>
  user: User
}

export function userRoleOptions(): { label: string; value: UserRole }[] {
  return Object.keys(UserRole).map((key: string) => ({ label: key, value: UserRole[key as UserRole] }))
}

export function userStatusOptions(): { label: string; value: UserStatus }[] {
  return Object.keys(UserStatus).map((key: string) => ({ label: key, value: UserStatus[key as UserStatus] }))
}

export function AuthUiUpdateUserForm({ submit, user }: AuthUiUpdateUserFormProps) {
  const model = {
    allowDm: user.allowDm ?? false,
    avatarUrl: user.avatarUrl ?? user.avatarUrl ?? '',
    developer: user.developer ?? false,
    language: user.language ?? '',
    location: user.location ?? '',
    name: user.name ?? '',
    role: user.role ?? UserRole.User,
    status: user.status ?? UserStatus.Created,
    username: user.username ?? '',
    verified: user.verified ?? false,
  }

  const fields: UiFormField<AdminUpdateUserInput>[] = [
    formFieldSelect('role', {
      label: 'Role',
      options: userRoleOptions(),
    }),
    formFieldSelect('status', {
      label: 'Status',
      options: userStatusOptions(),
    }),
    formFieldText('username', {
      label: 'Username',
    }),
    formFieldText('name', {
      label: 'Name',
    }),
    formFieldText('avatarUrl', {
      label: 'Avatar URL',
    }),
    formFieldText('location', {
      label: 'Location',
    }),
    formFieldText('language', {
      label: 'Language',
    }),
    formFieldCheckbox('allowDm', {
      label: 'Allow DM',
    }),
    formFieldCheckbox('developer', {
      label: 'Developer',
    }),
    formFieldCheckbox('verified', {
      label: 'Verified',
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminUpdateUserInput)}>
      <Group position="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
