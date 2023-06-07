import { AdminCreateUserInput } from '@pubkey-collections/sdk'
import { formFieldPassword, formFieldText, UiForm, UiFormField } from '@pubkey-collections/web/ui/core'
import { ReactNode } from 'react'

export interface AuthUiCreateUserFormProps {
  children?: ReactNode
  submit: (res: AdminCreateUserInput) => Promise<boolean>
}

export function AuthUiCreateUserForm({ children, submit }: AuthUiCreateUserFormProps) {
  const model: AdminCreateUserInput = {
    username: '',
    password: '',
  }

  const fields: UiFormField<AdminCreateUserInput>[] = [
    formFieldText('username', {
      label: 'Username',
    }),
    formFieldPassword('password', {
      label: 'Password',
    }),
  ]
  return (
    <UiForm model={model} fields={fields} submit={(res) => submit(res as AdminCreateUserInput)}>
      {children}
    </UiForm>
  )
}
