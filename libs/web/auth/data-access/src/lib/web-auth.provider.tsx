import { LoginInput, RegisterInput, User } from '@pubkey-collections/sdk'
import { useWebSdk } from '@pubkey-collections/web/shell/data-access'
import { notifyError, notifySuccess } from '@pubkey-collections/web/ui/notifications'

import { createContext, ReactNode, useContext, useEffect, useReducer } from 'react'
import { useMeQuery } from './use-me-query'

type AuthStatus = 'authenticated' | 'unauthenticated' | 'loading' | 'error'

export interface WebAuthState {
  status: AuthStatus
  error?: unknown | undefined
  user?: User | undefined
}

export interface WebAuthProviderContext extends WebAuthState {
  authenticated: boolean
  developer: boolean
  error?: unknown | undefined
  loading: boolean
  login: (input: LoginInput) => Promise<User | undefined>
  logout: () => Promise<boolean | undefined>
  register: (input: RegisterInput) => Promise<User | undefined>
}

const Context = createContext<WebAuthProviderContext>({} as WebAuthProviderContext)

export type WebAuthAction =
  | { type: 'login'; payload: User }
  | { type: 'logout'; payload?: unknown }
  | { type: 'error'; payload: unknown }
  | { type: 'loading'; payload?: unknown }

function authReducer(state: WebAuthState, { type, payload }: WebAuthAction): WebAuthState {
  switch (type) {
    case 'login':
      return {
        ...state,
        status: 'authenticated',
        user: payload,
      }
    case 'logout':
      return {
        ...state,
        status: 'unauthenticated',
        user: undefined,
      }
    case 'error':
      return {
        ...state,
        status: 'error',
        error: payload,
      }
    case 'loading':
      return {
        ...state,
        status: 'loading',
      }
    default:
      return state
  }
}

export function WebAuthProvider({ children }: { children: ReactNode }) {
  const sdk = useWebSdk()
  const query = useMeQuery(sdk)

  const [state, dispatch] = useReducer(authReducer, { status: 'loading' })

  useEffect(() => {
    if (query.isLoading) return
    dispatch(
      query.data?.data.me
        ? // We are authenticated
          { type: 'login', payload: query.data.data.me }
        : // We are not authenticated
          { type: 'logout' },
    )
  }, [query.isLoading])

  const value: WebAuthProviderContext = {
    authenticated: state.status === 'authenticated',
    developer: state.user?.developer ?? false,
    error: state.error,
    user: state.user,
    status: state.status,
    loading: state.status === 'loading',
    login: (input: LoginInput) =>
      sdk
        .login({ input })
        .then((res) => {
          if (res.data.login) {
            notifySuccess('Login successful')
            dispatch({ type: 'login', payload: res.data.login })
            return res.data.login
          }
          notifyError('Login failed')
        })
        .catch((err) => {
          notifyError(err.message)
          dispatch({ type: 'error', payload: err })
          return undefined
        }),
    logout: () =>
      sdk
        .logout()
        .then((res) => {
          if (res.data.logout) {
            notifySuccess('Logout successful')
            dispatch({ type: 'logout' })
            return res.data.logout
          }
          notifyError('Logout failed')
        })
        .catch((err) => {
          notifyError(err.message)
          dispatch({ type: 'error', payload: err })
          return undefined
        }),
    register: (input: RegisterInput) =>
      sdk
        .register({ input })
        .then((res) => {
          if (res.data.register) {
            notifySuccess('Register successful')
            dispatch({ type: 'login', payload: res.data.register })
            return res.data.register
          }
          notifyError('Register failed')
        })
        .catch((err) => {
          notifyError(err.message)
          dispatch({ type: 'error', payload: err })
          return undefined
        }),
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useWebAuth = () => useContext(Context)
