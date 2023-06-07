import { User, UserUpdateUserInput } from '@pubkey-collections/sdk'
import { formFieldCheckbox, formFieldText, UiForm, UiFormField } from '@pubkey-collections/web/ui/core'
import { Button, Group } from '@mantine/core'

export interface WebProfileUiUpdateFormProps {
  submit: (res: UserUpdateUserInput) => Promise<boolean>
  user: User
}

export function WebProfileUiUpdateForm({ submit, user }: WebProfileUiUpdateFormProps) {
  const model: UserUpdateUserInput = {
    allowDm: user.allowDm ?? false,
    avatarUrl: user.avatarUrl ?? user.avatarUrl ?? '',
    developer: user.developer ?? false,
    language: user.language ?? '',
    location: user.location ?? '',
    name: user.name ?? '',
  }

  const fields: UiFormField<UserUpdateUserInput>[] = [
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
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as UserUpdateUserInput)}>
      <Group position="right">
        <Button type="submit">Save</Button>
      </Group>
    </UiForm>
  )
}
