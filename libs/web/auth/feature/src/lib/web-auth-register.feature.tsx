import { RegisterInput } from '@pubkey-collections/sdk'
import { useWebAuth } from '@pubkey-collections/web/auth/data-access'
import { AuthUiRegisterForm } from '@pubkey-collections/web/auth/ui'
import { UiCard, UiFull } from '@pubkey-collections/web/ui/core'
import { Button, Group, Stack, Title } from '@mantine/core'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function WebAuthRegisterFeature() {
  const { register } = useWebAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  function registerHandler(input: RegisterInput) {
    setLoading(true)
    return register(input).then((res) => {
      if (res) {
        navigate('/dashboard')
      }
      setLoading(false)
      return !!res
    })
  }

  return (
    <UiFull>
      <UiCard miw={400} p="lg">
        <Stack>
          <Group position="center">
            <Title>Register</Title>
          </Group>
          <AuthUiRegisterForm submit={registerHandler}>
            <Group position="apart">
              <Button loading={loading} type="submit">
                Register
              </Button>
              <Button disabled={loading} component={Link} to="/auth/login" variant="default">
                Login
              </Button>
            </Group>
          </AuthUiRegisterForm>
        </Stack>
      </UiCard>
    </UiFull>
  )
}

export default WebAuthRegisterFeature
