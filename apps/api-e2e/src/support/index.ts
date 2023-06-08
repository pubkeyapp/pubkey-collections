export * from './graphql-sdk'

export function uniqueId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
}
