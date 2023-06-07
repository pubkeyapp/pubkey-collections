import { LoginInput } from '@pubkey-collections/sdk'
import { useWebAuth } from '@pubkey-collections/web/auth/data-access'
import { AuthUiLoginForm } from '@pubkey-collections/web/auth/ui'
import { UiAlert, UiCard, UiFull, UiStack } from '@pubkey-collections/web/ui/core'
import { Button, Card, Group, Stack, Title } from '@mantine/core'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export function WebAuthLoginFeature() {
  const { login, user } = useWebAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  const redirect = location.state?.from?.pathname || '/dashboard'
  async function loginHandler(input: LoginInput) {
    setLoading(true)
    // Delay for a second to show loading state
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return login(input).then((res) => {
      if (res) {
        navigate(redirect)
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
            <Title>Login</Title>
          </Group>
          {user && (
            <Button disabled={loading} fullWidth onClick={() => navigate(redirect)}>
              Continue as {user.username}
            </Button>
          )}
          <AuthUiLoginForm submit={loginHandler}>
            <Group position="apart">
              <Button loading={loading} type="submit">
                Login
              </Button>
              <Button disabled={loading} component={Link} to="/auth/register" variant="default">
                Register
              </Button>
            </Group>
          </AuthUiLoginForm>
        </Stack>
      </UiCard>
    </UiFull>
  )
}

export default WebAuthLoginFeature
