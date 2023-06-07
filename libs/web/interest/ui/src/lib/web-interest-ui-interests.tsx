import { Interest } from '@pubkey-collections/sdk'
import { useUserInterests } from '@pubkey-collections/web/interest/data-access'
import { UiCard } from '@pubkey-collections/web/ui/core'
import { Badge, Button, Group } from '@mantine/core'

export function WebInterestUiInterests({ title }: { title?: string }) {
  const { loading, interests, addInterest, removeInterest, activeIds } = useUserInterests()

  // Order the interests so the user's interests are first
  const ordered = interests?.sort((a, b) => {
    const interestA = activeIds?.includes(a.id)
    const interestB = activeIds?.includes(b.id)
    if (interestA && !interestB) {
      return -1
    }
    if (!interestA && interestB) {
      return 1
    }
    return 0
  })

  return (
    <UiCard title={title} loading={loading}>
      <Group py="sm">
        {ordered?.map((interest) => {
          const active = activeIds?.includes(interest.id)
          return (
            <Button
              size="xs"
              key={interest.id}
              variant={active ? 'filled' : 'outline'}
              onClick={() => {
                if (active) {
                  return removeInterest(interest.id)
                }
                return addInterest(interest.id)
              }}
            >
              {interest.name}
            </Button>
          )
        })}
      </Group>
    </UiCard>
  )
}

export function WebInterestUiBadges({ interests }: { interests: Interest[] }) {
  return (
    <Group py="sm">
      {interests.map((interest) => (
        <Badge key={interest.id}>{interest.name ?? ''}</Badge>
      ))}
    </Group>
  )
}
