import { Invite } from '@pubkey-collections/sdk'
import { AdminUiUserLink } from '@pubkey-collections/web/admin/ui'
import { UiAlert, UiCard, UiGroup, UiTime } from '@pubkey-collections/web/ui/core'
import { Code, Stack, Text, useMantineTheme } from '@mantine/core'

export function WebAdminInviteOverviewTab({ invite }: { invite: Invite }) {
  const theme = useMantineTheme()

  return (
    <UiCard>
      <Stack spacing={theme.spacing.lg}>
        <Text>Inviter</Text>
        {invite.owner ? <AdminUiUserLink user={invite.owner} /> : null}
        <Text>Expires</Text>
        <UiGroup>
          {invite.expiresAt ? <UiTime datetime={new Date(invite.expiresAt)} /> : <Code color="red">Never</Code>}
        </UiGroup>
        <Text>
          Invited users: {invite.useCount}/{(invite?.maxUses ?? 0) > 0 ? invite.maxUses : '∞'}
        </Text>
        {!invite?.users?.length ? (
          <UiAlert message="No user invited yet." />
        ) : (
          invite?.users?.map((user) => <AdminUiUserLink key={user.id} user={user} />)
        )}
      </Stack>
    </UiCard>
  )
}
