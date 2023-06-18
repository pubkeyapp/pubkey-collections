import { AdminCreateEmailInput, AdminFindEmailsInput, AdminUpdateEmailInput, Email } from '@pubkey-collections/sdk'
import { useWebSdk } from '@pubkey-collections/web/shell/data-access'
import { notifyError, notifySuccess } from '@pubkey-collections/web/ui/notifications'
import { modals } from '@mantine/modals'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export function useAdminEmail(userId: string) {
  const sdk = useWebSdk()

  const [input] = useState<AdminFindEmailsInput>({
    ownerId: userId,
  })

  const query = useQuery(['admin', 'emails', 'find', input], () =>
    sdk.adminFindEmails({ input }).then((res) => res.data),
  )

  return {
    emails: query.data?.items ?? [],
    query,
    createEmail: (input: AdminCreateEmailInput) =>
      sdk
        .adminCreateEmail({ input: { email: input.email, ownerId: userId } })
        .then(async (res) => {
          if (res) {
            notifySuccess('Email created')
            modals.closeAll()
            await query.refetch()
            return true
          }
          notifyError('Error creating email')
          return false
        })
        .catch((err) => {
          notifyError(`${err}`)
          return false
        }),
    deleteEmail: (email: Email) => {
      return sdk.adminDeleteEmail({ emailId: email.id }).then(async (res) => {
        if (res) {
          notifySuccess('Email deleted')
          await query.refetch()
          return true
        }
        notifyError('Error deleting email')
        return false
      })
    },
    updateEmail: (emailId: string, input: AdminUpdateEmailInput) => {
      return sdk
        .adminUpdateEmail({
          emailId,
          input: input,
        })
        .then(async (res) => {
          if (res) {
            notifySuccess('Email created')
            modals.closeAll()
            await query.refetch()
            return true
          }
          notifyError('Error creating email')
          return false
        })
        .catch((err) => {
          notifyError(`${err}`)
          return false
        })
    },
  }
}
