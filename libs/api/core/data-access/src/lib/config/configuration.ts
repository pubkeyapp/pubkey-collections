// Remove trailing slashes from the URLs to avoid double slashes
const API_URL = getUrl('API_URL') as string
// Infer the WEB URL from the API_URL if it's not set
const WEB_URL = getUrl('WEB_URL') ?? API_URL?.replace('/api', '')

const cookieDomains: string[] = getCookieDomains()

// Infer the cookie domain from the API_URL if it's not set
if (!cookieDomains.length) {
  const { hostname } = new URL(API_URL)
  cookieDomains.push(hostname)
}

const corsOrigins: string[] = getCorsOrigins()

export type Env = 'development' | 'production' | 'test' | 'provision'
export interface ApiCoreConfig {
  apiUrl: string
  authPasswordEnabled: boolean
  authRegisterEnabled: boolean
  cookieDomains: string[]
  cookieName: string
  corsOrigins: string[]
  environment: Env
  databaseReset: boolean
  databaseProvision: boolean
  host: string
  port: number
  webUrl: string
}

export const configuration = (): ApiCoreConfig => ({
  apiUrl: process.env['API_URL'] as string,
  authPasswordEnabled: process.env['AUTH_PASSWORD_ENABLED'] === 'true',
  authRegisterEnabled: process.env['AUTH_REGISTER_ENABLED'] === 'true',
  cookieDomains,
  cookieName: '__session',
  corsOrigins,
  environment: (process.env['NODE_ENV'] as Env) || 'development',
  databaseReset: process.env['DATABASE_RESET'] === 'true',
  databaseProvision: process.env['DATABASE_PROVISION'] === 'true',
  host: process.env['HOST'] as string,
  port: parseInt(process.env['PORT'] as string, 10) || 3000,
  webUrl: WEB_URL,
})

// Get the cookie domains from the ENV
function getCookieDomains() {
  return getFromEnvironment('COOKIE_DOMAINS').filter(Boolean)
}

// Get the origins from the ENV
function getCorsOrigins() {
  return getFromEnvironment('CORS_ORIGINS').filter(Boolean)
}

// Get the values from the ENV
function getFromEnvironment(key: string) {
  return (process.env[key]?.includes(',') ? (process.env[key]?.split(',') as string[]) : [process.env[key]]) as string[]
}

function getUrl(key: string) {
  return process.env[key]?.replace(/\/$/, '')
}
