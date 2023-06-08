// @ts-nocheck
import { GraphQLClient } from 'graphql-request'
import * as Dom from 'graphql-request/dist/types.dom'
import { print } from 'graphql'
import gql from 'graphql-tag'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: Date
}

export type AdminCreateEmailInput = {
  email: Scalars['String']
  ownerId: Scalars['String']
}

export type AdminCreateIdentityInput = {
  ownerId: Scalars['String']
  provider: IdentityProvider
  providerId: Scalars['String']
}

export type AdminCreateInviteInput = {
  expiresAt?: InputMaybe<Scalars['String']>
  maxUses?: InputMaybe<Scalars['Int']>
  ownerId?: InputMaybe<Scalars['String']>
}

export type AdminCreateUserInput = {
  password?: InputMaybe<Scalars['String']>
  username: Scalars['String']
}

export type AdminFindEmailsInput = {
  ownerId: Scalars['String']
}

export type AdminFindIdentitiesInput = {
  ownerId: Scalars['String']
}

export type AdminFindInvitesInput = {
  ownerId?: InputMaybe<Scalars['String']>
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type AdminFindNotificationsInput = {
  owner?: InputMaybe<Scalars['String']>
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type AdminFindUsersInput = {
  role?: InputMaybe<UserRole>
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  status?: InputMaybe<UserStatus>
  take?: InputMaybe<Scalars['Int']>
}

export type AdminUpdateEmailInput = {
  default?: InputMaybe<Scalars['Boolean']>
  email?: InputMaybe<Scalars['String']>
  private?: InputMaybe<Scalars['Boolean']>
  verified?: InputMaybe<Scalars['Boolean']>
}

export type AdminUpdateInviteInput = {
  expiresAt?: InputMaybe<Scalars['DateTime']>
  maxUses?: InputMaybe<Scalars['Int']>
}

export type AdminUpdateUserInput = {
  allowDm?: InputMaybe<Scalars['Boolean']>
  avatarUrl?: InputMaybe<Scalars['String']>
  developer?: InputMaybe<Scalars['Boolean']>
  language?: InputMaybe<Scalars['String']>
  location?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
  role?: InputMaybe<UserRole>
  status?: InputMaybe<UserStatus>
  username?: InputMaybe<Scalars['String']>
  verified?: InputMaybe<Scalars['Boolean']>
}

export type Email = {
  __typename?: 'Email'
  createdAt: Scalars['DateTime']
  default?: Maybe<Scalars['Boolean']>
  email: Scalars['String']
  id: Scalars['String']
  private?: Maybe<Scalars['Boolean']>
  updatedAt: Scalars['DateTime']
  verified?: Maybe<Scalars['Boolean']>
}

export type Identity = {
  __typename?: 'Identity'
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  provider: IdentityProvider
  providerId: Scalars['String']
  updatedAt: Scalars['DateTime']
}

export enum IdentityProvider {
  GitHub = 'GitHub',
  Solana = 'Solana',
}

export type Invite = {
  __typename?: 'Invite'
  code?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  expiresAt?: Maybe<Scalars['DateTime']>
  id: Scalars['String']
  inviteUrl?: Maybe<Scalars['String']>
  isExpired?: Maybe<Scalars['Boolean']>
  isUsedUp?: Maybe<Scalars['Boolean']>
  maxUses?: Maybe<Scalars['Int']>
  owner?: Maybe<User>
  updatedAt: Scalars['DateTime']
  useCount?: Maybe<Scalars['Int']>
  users?: Maybe<Array<User>>
}

export type LoginInput = {
  password: Scalars['String']
  username: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  adminCreateEmail?: Maybe<Email>
  adminCreateIdentity?: Maybe<Identity>
  adminCreateInvite?: Maybe<Invite>
  adminCreateUser?: Maybe<User>
  adminDeleteEmail?: Maybe<Scalars['Boolean']>
  adminDeleteIdentity?: Maybe<Scalars['Boolean']>
  adminDeleteInvite?: Maybe<Invite>
  adminDeleteNotification?: Maybe<Scalars['Boolean']>
  adminDeleteUser?: Maybe<Scalars['Boolean']>
  adminUpdateEmail?: Maybe<Email>
  adminUpdateInvite?: Maybe<Invite>
  adminUpdateUser?: Maybe<User>
  login?: Maybe<User>
  logout?: Maybe<Scalars['Boolean']>
  register?: Maybe<User>
  userAcceptInvite?: Maybe<Invite>
  userDeleteNotification?: Maybe<Scalars['Boolean']>
  userPoke?: Maybe<Scalars['Boolean']>
  userReadAllNotifications?: Maybe<Scalars['Boolean']>
  userReadNotification?: Maybe<Scalars['Boolean']>
  userUpdateUser?: Maybe<User>
}

export type MutationAdminCreateEmailArgs = {
  input: AdminCreateEmailInput
}

export type MutationAdminCreateIdentityArgs = {
  input: AdminCreateIdentityInput
}

export type MutationAdminCreateInviteArgs = {
  input: AdminCreateInviteInput
}

export type MutationAdminCreateUserArgs = {
  input: AdminCreateUserInput
}

export type MutationAdminDeleteEmailArgs = {
  emailId: Scalars['String']
}

export type MutationAdminDeleteIdentityArgs = {
  identityId: Scalars['String']
}

export type MutationAdminDeleteInviteArgs = {
  inviteId: Scalars['String']
}

export type MutationAdminDeleteNotificationArgs = {
  notificationId: Scalars['String']
}

export type MutationAdminDeleteUserArgs = {
  userId: Scalars['String']
}

export type MutationAdminUpdateEmailArgs = {
  emailId: Scalars['String']
  input: AdminUpdateEmailInput
}

export type MutationAdminUpdateInviteArgs = {
  input: AdminUpdateInviteInput
  inviteId: Scalars['String']
}

export type MutationAdminUpdateUserArgs = {
  input: AdminUpdateUserInput
  userId: Scalars['String']
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationUserAcceptInviteArgs = {
  code: Scalars['String']
}

export type MutationUserDeleteNotificationArgs = {
  notificationId: Scalars['String']
}

export type MutationUserPokeArgs = {
  pokeId: Scalars['String']
}

export type MutationUserReadNotificationArgs = {
  notificationId: Scalars['String']
}

export type MutationUserUpdateUserArgs = {
  input: UserUpdateUserInput
}

export type Notification = {
  __typename?: 'Notification'
  actor?: Maybe<User>
  createdAt: Scalars['DateTime']
  id: Scalars['String']
  message?: Maybe<Scalars['String']>
  read?: Maybe<Scalars['Boolean']>
  type?: Maybe<NotificationType>
  updatedAt: Scalars['DateTime']
}

export enum NotificationType {
  Poke = 'Poke',
  System = 'System',
}

export type Paging = {
  __typename?: 'Paging'
  count?: Maybe<Scalars['Int']>
  skip?: Maybe<Scalars['Int']>
  take?: Maybe<Scalars['Int']>
  total?: Maybe<Scalars['Int']>
}

export type Query = {
  __typename?: 'Query'
  adminFindEmails?: Maybe<Array<Email>>
  adminFindIdentities?: Maybe<Array<Identity>>
  adminFindInvites?: Maybe<Array<Invite>>
  adminFindInvitesCount?: Maybe<Paging>
  adminFindNotifications?: Maybe<Array<Notification>>
  adminFindNotificationsCount?: Maybe<Paging>
  adminFindUsers?: Maybe<Array<User>>
  adminFindUsersCount?: Maybe<Paging>
  adminGetInvite?: Maybe<Invite>
  adminGetUser?: Maybe<User>
  anonGetInvite?: Maybe<Invite>
  me?: Maybe<User>
  uptime: Scalars['Float']
  userFindNotifications?: Maybe<Array<Notification>>
  userFindNotificationsCount?: Maybe<Paging>
  userFindUsers?: Maybe<Array<User>>
  userFindUsersCount?: Maybe<Paging>
  userGetInvite?: Maybe<Invite>
  userGetInvites?: Maybe<Array<Invite>>
  userGetUserByUsername?: Maybe<User>
}

export type QueryAdminFindEmailsArgs = {
  input: AdminFindEmailsInput
}

export type QueryAdminFindIdentitiesArgs = {
  input: AdminFindIdentitiesInput
}

export type QueryAdminFindInvitesArgs = {
  input: AdminFindInvitesInput
}

export type QueryAdminFindInvitesCountArgs = {
  input: AdminFindInvitesInput
}

export type QueryAdminFindNotificationsArgs = {
  input: AdminFindNotificationsInput
}

export type QueryAdminFindNotificationsCountArgs = {
  input: AdminFindNotificationsInput
}

export type QueryAdminFindUsersArgs = {
  input: AdminFindUsersInput
}

export type QueryAdminFindUsersCountArgs = {
  input: AdminFindUsersInput
}

export type QueryAdminGetInviteArgs = {
  inviteId: Scalars['String']
}

export type QueryAdminGetUserArgs = {
  userId: Scalars['String']
}

export type QueryAnonGetInviteArgs = {
  code: Scalars['String']
}

export type QueryUserFindNotificationsArgs = {
  input: UserFindNotificationsInput
}

export type QueryUserFindNotificationsCountArgs = {
  input: UserFindNotificationsInput
}

export type QueryUserFindUsersArgs = {
  input: UserFindUsersInput
}

export type QueryUserFindUsersCountArgs = {
  input: UserFindUsersInput
}

export type QueryUserGetUserByUsernameArgs = {
  username: Scalars['String']
}

export type RegisterInput = {
  password: Scalars['String']
  username: Scalars['String']
}

export type User = {
  __typename?: 'User'
  allowDm?: Maybe<Scalars['Boolean']>
  avatarUrl?: Maybe<Scalars['String']>
  createdAt: Scalars['DateTime']
  developer?: Maybe<Scalars['Boolean']>
  id: Scalars['String']
  language?: Maybe<Scalars['String']>
  location?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  role: UserRole
  status: UserStatus
  updatedAt: Scalars['DateTime']
  username?: Maybe<Scalars['String']>
  verified?: Maybe<Scalars['Boolean']>
}

export type UserFindNotificationsInput = {
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export type UserFindUsersInput = {
  search?: InputMaybe<Scalars['String']>
  skip?: InputMaybe<Scalars['Int']>
  take?: InputMaybe<Scalars['Int']>
}

export enum UserRole {
  Admin = 'Admin',
  User = 'User',
}

export enum UserStatus {
  Active = 'Active',
  Created = 'Created',
  Inactive = 'Inactive',
}

export type UserUpdateUserInput = {
  allowDm?: InputMaybe<Scalars['Boolean']>
  avatarUrl?: InputMaybe<Scalars['String']>
  developer?: InputMaybe<Scalars['Boolean']>
  language?: InputMaybe<Scalars['String']>
  location?: InputMaybe<Scalars['String']>
  name?: InputMaybe<Scalars['String']>
}

export type LoginMutationVariables = Exact<{
  input: LoginInput
}>

export type LoginMutation = {
  __typename?: 'Mutation'
  login?: {
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt: Date
    developer?: boolean | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    role: UserRole
    status: UserStatus
    updatedAt: Date
    username?: string | null
    verified?: boolean | null
  } | null
}

export type LogoutMutationVariables = Exact<{ [key: string]: never }>

export type LogoutMutation = { __typename?: 'Mutation'; logout?: boolean | null }

export type RegisterMutationVariables = Exact<{
  input: RegisterInput
}>

export type RegisterMutation = {
  __typename?: 'Mutation'
  register?: {
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt: Date
    developer?: boolean | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    role: UserRole
    status: UserStatus
    updatedAt: Date
    username?: string | null
    verified?: boolean | null
  } | null
}

export type MeQueryVariables = Exact<{ [key: string]: never }>

export type MeQuery = {
  __typename?: 'Query'
  me?: {
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt: Date
    developer?: boolean | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    role: UserRole
    status: UserStatus
    updatedAt: Date
    username?: string | null
    verified?: boolean | null
  } | null
}

export type PagingDetailsFragment = {
  __typename?: 'Paging'
  count?: number | null
  skip?: number | null
  take?: number | null
  total?: number | null
}

export type UptimeQueryVariables = Exact<{ [key: string]: never }>

export type UptimeQuery = { __typename?: 'Query'; uptime: number }

export type EmailDetailsFragment = {
  __typename?: 'Email'
  createdAt: Date
  default?: boolean | null
  email: string
  id: string
  private?: boolean | null
  updatedAt: Date
  verified?: boolean | null
}

export type AdminFindEmailsQueryVariables = Exact<{
  input: AdminFindEmailsInput
}>

export type AdminFindEmailsQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Email'
    createdAt: Date
    default?: boolean | null
    email: string
    id: string
    private?: boolean | null
    updatedAt: Date
    verified?: boolean | null
  }> | null
}

export type AdminCreateEmailMutationVariables = Exact<{
  input: AdminCreateEmailInput
}>

export type AdminCreateEmailMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Email'
    createdAt: Date
    default?: boolean | null
    email: string
    id: string
    private?: boolean | null
    updatedAt: Date
    verified?: boolean | null
  } | null
}

export type AdminUpdateEmailMutationVariables = Exact<{
  emailId: Scalars['String']
  input: AdminUpdateEmailInput
}>

export type AdminUpdateEmailMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'Email'
    createdAt: Date
    default?: boolean | null
    email: string
    id: string
    private?: boolean | null
    updatedAt: Date
    verified?: boolean | null
  } | null
}

export type AdminDeleteEmailMutationVariables = Exact<{
  emailId: Scalars['String']
}>

export type AdminDeleteEmailMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type IdentityDetailsFragment = {
  __typename?: 'Identity'
  createdAt: Date
  provider: IdentityProvider
  providerId: string
  id: string
  updatedAt: Date
}

export type AdminFindIdentitiesQueryVariables = Exact<{
  input: AdminFindIdentitiesInput
}>

export type AdminFindIdentitiesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Identity'
    createdAt: Date
    provider: IdentityProvider
    providerId: string
    id: string
    updatedAt: Date
  }> | null
}

export type AdminCreateIdentityMutationVariables = Exact<{
  input: AdminCreateIdentityInput
}>

export type AdminCreateIdentityMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'Identity'
    createdAt: Date
    provider: IdentityProvider
    providerId: string
    id: string
    updatedAt: Date
  } | null
}

export type AdminDeleteIdentityMutationVariables = Exact<{
  identityId: Scalars['String']
}>

export type AdminDeleteIdentityMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type InviteDetailsFragment = {
  __typename?: 'Invite'
  id: string
  createdAt: Date
  updatedAt: Date
  expiresAt?: Date | null
  code?: string | null
  maxUses?: number | null
  useCount?: number | null
  inviteUrl?: string | null
  isExpired?: boolean | null
  isUsedUp?: boolean | null
  owner?: {
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt: Date
    developer?: boolean | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    role: UserRole
    status: UserStatus
    updatedAt: Date
    username?: string | null
    verified?: boolean | null
  } | null
}

export type AdminGetInviteQueryVariables = Exact<{
  inviteId: Scalars['String']
}>

export type AdminGetInviteQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Invite'
    id: string
    createdAt: Date
    updatedAt: Date
    expiresAt?: Date | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    users?: Array<{
      __typename?: 'User'
      allowDm?: boolean | null
      avatarUrl?: string | null
      createdAt: Date
      developer?: boolean | null
      id: string
      language?: string | null
      location?: string | null
      name?: string | null
      role: UserRole
      status: UserStatus
      updatedAt: Date
      username?: string | null
      verified?: boolean | null
    }> | null
    owner?: {
      __typename?: 'User'
      allowDm?: boolean | null
      avatarUrl?: string | null
      createdAt: Date
      developer?: boolean | null
      id: string
      language?: string | null
      location?: string | null
      name?: string | null
      role: UserRole
      status: UserStatus
      updatedAt: Date
      username?: string | null
      verified?: boolean | null
    } | null
  } | null
}

export type AdminFindInvitesQueryVariables = Exact<{
  input: AdminFindInvitesInput
}>

export type AdminFindInvitesQuery = {
  __typename?: 'Query'
  count?: {
    __typename?: 'Paging'
    count?: number | null
    skip?: number | null
    take?: number | null
    total?: number | null
  } | null
  items?: Array<{
    __typename?: 'Invite'
    id: string
    createdAt: Date
    updatedAt: Date
    expiresAt?: Date | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    owner?: {
      __typename?: 'User'
      allowDm?: boolean | null
      avatarUrl?: string | null
      createdAt: Date
      developer?: boolean | null
      id: string
      language?: string | null
      location?: string | null
      name?: string | null
      role: UserRole
      status: UserStatus
      updatedAt: Date
      username?: string | null
      verified?: boolean | null
    } | null
  }> | null
}

export type AdminCreateInviteMutationVariables = Exact<{
  input: AdminCreateInviteInput
}>

export type AdminCreateInviteMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Invite'
    id: string
    createdAt: Date
    updatedAt: Date
    expiresAt?: Date | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    owner?: {
      __typename?: 'User'
      allowDm?: boolean | null
      avatarUrl?: string | null
      createdAt: Date
      developer?: boolean | null
      id: string
      language?: string | null
      location?: string | null
      name?: string | null
      role: UserRole
      status: UserStatus
      updatedAt: Date
      username?: string | null
      verified?: boolean | null
    } | null
  } | null
}

export type AdminUpdateInviteMutationVariables = Exact<{
  inviteId: Scalars['String']
  input: AdminUpdateInviteInput
}>

export type AdminUpdateInviteMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Invite'
    id: string
    createdAt: Date
    updatedAt: Date
    expiresAt?: Date | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    owner?: {
      __typename?: 'User'
      allowDm?: boolean | null
      avatarUrl?: string | null
      createdAt: Date
      developer?: boolean | null
      id: string
      language?: string | null
      location?: string | null
      name?: string | null
      role: UserRole
      status: UserStatus
      updatedAt: Date
      username?: string | null
      verified?: boolean | null
    } | null
  } | null
}

export type AdminDeleteInviteMutationVariables = Exact<{
  inviteId: Scalars['String']
}>

export type AdminDeleteInviteMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Invite'
    id: string
    createdAt: Date
    updatedAt: Date
    expiresAt?: Date | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    owner?: {
      __typename?: 'User'
      allowDm?: boolean | null
      avatarUrl?: string | null
      createdAt: Date
      developer?: boolean | null
      id: string
      language?: string | null
      location?: string | null
      name?: string | null
      role: UserRole
      status: UserStatus
      updatedAt: Date
      username?: string | null
      verified?: boolean | null
    } | null
  } | null
}

export type AnonGetInviteQueryVariables = Exact<{
  code: Scalars['String']
}>

export type AnonGetInviteQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Invite'
    id: string
    createdAt: Date
    updatedAt: Date
    expiresAt?: Date | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    users?: Array<{
      __typename?: 'User'
      allowDm?: boolean | null
      avatarUrl?: string | null
      createdAt: Date
      developer?: boolean | null
      id: string
      language?: string | null
      location?: string | null
      name?: string | null
      role: UserRole
      status: UserStatus
      updatedAt: Date
      username?: string | null
      verified?: boolean | null
    }> | null
    owner?: {
      __typename?: 'User'
      allowDm?: boolean | null
      avatarUrl?: string | null
      createdAt: Date
      developer?: boolean | null
      id: string
      language?: string | null
      location?: string | null
      name?: string | null
      role: UserRole
      status: UserStatus
      updatedAt: Date
      username?: string | null
      verified?: boolean | null
    } | null
  } | null
}

export type UserGetInvitesQueryVariables = Exact<{ [key: string]: never }>

export type UserGetInvitesQuery = {
  __typename?: 'Query'
  items?: Array<{
    __typename?: 'Invite'
    id: string
    createdAt: Date
    updatedAt: Date
    expiresAt?: Date | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    owner?: {
      __typename?: 'User'
      allowDm?: boolean | null
      avatarUrl?: string | null
      createdAt: Date
      developer?: boolean | null
      id: string
      language?: string | null
      location?: string | null
      name?: string | null
      role: UserRole
      status: UserStatus
      updatedAt: Date
      username?: string | null
      verified?: boolean | null
    } | null
  }> | null
}

export type UserGetInviteQueryVariables = Exact<{ [key: string]: never }>

export type UserGetInviteQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'Invite'
    id: string
    createdAt: Date
    updatedAt: Date
    expiresAt?: Date | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    users?: Array<{
      __typename?: 'User'
      allowDm?: boolean | null
      avatarUrl?: string | null
      createdAt: Date
      developer?: boolean | null
      id: string
      language?: string | null
      location?: string | null
      name?: string | null
      role: UserRole
      status: UserStatus
      updatedAt: Date
      username?: string | null
      verified?: boolean | null
    }> | null
    owner?: {
      __typename?: 'User'
      allowDm?: boolean | null
      avatarUrl?: string | null
      createdAt: Date
      developer?: boolean | null
      id: string
      language?: string | null
      location?: string | null
      name?: string | null
      role: UserRole
      status: UserStatus
      updatedAt: Date
      username?: string | null
      verified?: boolean | null
    } | null
  } | null
}

export type UserAcceptInviteMutationVariables = Exact<{
  code: Scalars['String']
}>

export type UserAcceptInviteMutation = {
  __typename?: 'Mutation'
  item?: {
    __typename?: 'Invite'
    id: string
    createdAt: Date
    updatedAt: Date
    expiresAt?: Date | null
    code?: string | null
    maxUses?: number | null
    useCount?: number | null
    inviteUrl?: string | null
    isExpired?: boolean | null
    isUsedUp?: boolean | null
    owner?: {
      __typename?: 'User'
      allowDm?: boolean | null
      avatarUrl?: string | null
      createdAt: Date
      developer?: boolean | null
      id: string
      language?: string | null
      location?: string | null
      name?: string | null
      role: UserRole
      status: UserStatus
      updatedAt: Date
      username?: string | null
      verified?: boolean | null
    } | null
  } | null
}

export type NotificationDetailsFragment = {
  __typename?: 'Notification'
  createdAt: Date
  id: string
  message?: string | null
  read?: boolean | null
  type?: NotificationType | null
  updatedAt: Date
  actor?: {
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt: Date
    developer?: boolean | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    role: UserRole
    status: UserStatus
    updatedAt: Date
    username?: string | null
    verified?: boolean | null
  } | null
}

export type AdminFindNotificationsQueryVariables = Exact<{
  input: AdminFindNotificationsInput
}>

export type AdminFindNotificationsQuery = {
  __typename?: 'Query'
  count?: {
    __typename?: 'Paging'
    count?: number | null
    skip?: number | null
    take?: number | null
    total?: number | null
  } | null
  items?: Array<{
    __typename?: 'Notification'
    createdAt: Date
    id: string
    message?: string | null
    read?: boolean | null
    type?: NotificationType | null
    updatedAt: Date
    actor?: {
      __typename?: 'User'
      allowDm?: boolean | null
      avatarUrl?: string | null
      createdAt: Date
      developer?: boolean | null
      id: string
      language?: string | null
      location?: string | null
      name?: string | null
      role: UserRole
      status: UserStatus
      updatedAt: Date
      username?: string | null
      verified?: boolean | null
    } | null
  }> | null
}

export type AdminDeleteNotificationMutationVariables = Exact<{
  notificationId: Scalars['String']
}>

export type AdminDeleteNotificationMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindNotificationsQueryVariables = Exact<{
  input: UserFindNotificationsInput
}>

export type UserFindNotificationsQuery = {
  __typename?: 'Query'
  count?: {
    __typename?: 'Paging'
    count?: number | null
    skip?: number | null
    take?: number | null
    total?: number | null
  } | null
  items?: Array<{
    __typename?: 'Notification'
    createdAt: Date
    id: string
    message?: string | null
    read?: boolean | null
    type?: NotificationType | null
    updatedAt: Date
    actor?: {
      __typename?: 'User'
      allowDm?: boolean | null
      avatarUrl?: string | null
      createdAt: Date
      developer?: boolean | null
      id: string
      language?: string | null
      location?: string | null
      name?: string | null
      role: UserRole
      status: UserStatus
      updatedAt: Date
      username?: string | null
      verified?: boolean | null
    } | null
  }> | null
}

export type UserDeleteNotificationMutationVariables = Exact<{
  notificationId: Scalars['String']
}>

export type UserDeleteNotificationMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserPokeMutationVariables = Exact<{
  pokeId: Scalars['String']
}>

export type UserPokeMutation = { __typename?: 'Mutation'; poked?: boolean | null }

export type UserReadNotificationMutationVariables = Exact<{
  notificationId: Scalars['String']
}>

export type UserReadNotificationMutation = { __typename?: 'Mutation'; read?: boolean | null }

export type UserReadAllNotificationsMutationVariables = Exact<{ [key: string]: never }>

export type UserReadAllNotificationsMutation = { __typename?: 'Mutation'; read?: boolean | null }

export type UserDetailsFragment = {
  __typename?: 'User'
  allowDm?: boolean | null
  avatarUrl?: string | null
  createdAt: Date
  developer?: boolean | null
  id: string
  language?: string | null
  location?: string | null
  name?: string | null
  role: UserRole
  status: UserStatus
  updatedAt: Date
  username?: string | null
  verified?: boolean | null
}

export type AdminFindUsersQueryVariables = Exact<{
  input: AdminFindUsersInput
}>

export type AdminFindUsersQuery = {
  __typename?: 'Query'
  count?: {
    __typename?: 'Paging'
    count?: number | null
    skip?: number | null
    take?: number | null
    total?: number | null
  } | null
  items?: Array<{
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt: Date
    developer?: boolean | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    role: UserRole
    status: UserStatus
    updatedAt: Date
    username?: string | null
    verified?: boolean | null
  }> | null
}

export type AdminGetUserQueryVariables = Exact<{
  userId: Scalars['String']
}>

export type AdminGetUserQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt: Date
    developer?: boolean | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    role: UserRole
    status: UserStatus
    updatedAt: Date
    username?: string | null
    verified?: boolean | null
  } | null
}

export type AdminCreateUserMutationVariables = Exact<{
  input: AdminCreateUserInput
}>

export type AdminCreateUserMutation = {
  __typename?: 'Mutation'
  created?: {
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt: Date
    developer?: boolean | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    role: UserRole
    status: UserStatus
    updatedAt: Date
    username?: string | null
    verified?: boolean | null
  } | null
}

export type AdminUpdateUserMutationVariables = Exact<{
  userId: Scalars['String']
  input: AdminUpdateUserInput
}>

export type AdminUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt: Date
    developer?: boolean | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    role: UserRole
    status: UserStatus
    updatedAt: Date
    username?: string | null
    verified?: boolean | null
  } | null
}

export type AdminDeleteUserMutationVariables = Exact<{
  userId: Scalars['String']
}>

export type AdminDeleteUserMutation = { __typename?: 'Mutation'; deleted?: boolean | null }

export type UserFindUsersQueryVariables = Exact<{
  input: UserFindUsersInput
}>

export type UserFindUsersQuery = {
  __typename?: 'Query'
  count?: {
    __typename?: 'Paging'
    count?: number | null
    skip?: number | null
    take?: number | null
    total?: number | null
  } | null
  items?: Array<{
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt: Date
    developer?: boolean | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    role: UserRole
    status: UserStatus
    updatedAt: Date
    username?: string | null
    verified?: boolean | null
  }> | null
}

export type UserGetUserByUsernameQueryVariables = Exact<{
  username: Scalars['String']
}>

export type UserGetUserByUsernameQuery = {
  __typename?: 'Query'
  item?: {
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt: Date
    developer?: boolean | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    role: UserRole
    status: UserStatus
    updatedAt: Date
    username?: string | null
    verified?: boolean | null
  } | null
}

export type UserUpdateUserMutationVariables = Exact<{
  input: UserUpdateUserInput
}>

export type UserUpdateUserMutation = {
  __typename?: 'Mutation'
  updated?: {
    __typename?: 'User'
    allowDm?: boolean | null
    avatarUrl?: string | null
    createdAt: Date
    developer?: boolean | null
    id: string
    language?: string | null
    location?: string | null
    name?: string | null
    role: UserRole
    status: UserStatus
    updatedAt: Date
    username?: string | null
    verified?: boolean | null
  } | null
}

export const PagingDetailsFragmentDoc = gql`
  fragment PagingDetails on Paging {
    count
    skip
    take
    total
  }
`
export const EmailDetailsFragmentDoc = gql`
  fragment EmailDetails on Email {
    createdAt
    default
    email
    id
    private
    updatedAt
    verified
  }
`
export const IdentityDetailsFragmentDoc = gql`
  fragment IdentityDetails on Identity {
    createdAt
    provider
    providerId
    id
    updatedAt
  }
`
export const UserDetailsFragmentDoc = gql`
  fragment UserDetails on User {
    allowDm
    avatarUrl
    createdAt
    developer
    id
    language
    location
    name
    role
    status
    updatedAt
    username
    verified
  }
`
export const InviteDetailsFragmentDoc = gql`
  fragment InviteDetails on Invite {
    id
    createdAt
    updatedAt
    expiresAt
    code
    maxUses
    useCount
    inviteUrl
    isExpired
    isUsedUp
    owner {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const NotificationDetailsFragmentDoc = gql`
  fragment NotificationDetails on Notification {
    createdAt
    id
    message
    read
    type
    updatedAt
    actor {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const LoginDocument = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const LogoutDocument = gql`
  mutation logout {
    logout
  }
`
export const RegisterDocument = gql`
  mutation register($input: RegisterInput!) {
    register(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const MeDocument = gql`
  query me {
    me {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const UptimeDocument = gql`
  query uptime {
    uptime
  }
`
export const AdminFindEmailsDocument = gql`
  query adminFindEmails($input: AdminFindEmailsInput!) {
    items: adminFindEmails(input: $input) {
      ...EmailDetails
    }
  }
  ${EmailDetailsFragmentDoc}
`
export const AdminCreateEmailDocument = gql`
  mutation adminCreateEmail($input: AdminCreateEmailInput!) {
    created: adminCreateEmail(input: $input) {
      ...EmailDetails
    }
  }
  ${EmailDetailsFragmentDoc}
`
export const AdminUpdateEmailDocument = gql`
  mutation adminUpdateEmail($emailId: String!, $input: AdminUpdateEmailInput!) {
    updated: adminUpdateEmail(emailId: $emailId, input: $input) {
      ...EmailDetails
    }
  }
  ${EmailDetailsFragmentDoc}
`
export const AdminDeleteEmailDocument = gql`
  mutation adminDeleteEmail($emailId: String!) {
    deleted: adminDeleteEmail(emailId: $emailId)
  }
`
export const AdminFindIdentitiesDocument = gql`
  query adminFindIdentities($input: AdminFindIdentitiesInput!) {
    items: adminFindIdentities(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const AdminCreateIdentityDocument = gql`
  mutation adminCreateIdentity($input: AdminCreateIdentityInput!) {
    created: adminCreateIdentity(input: $input) {
      ...IdentityDetails
    }
  }
  ${IdentityDetailsFragmentDoc}
`
export const AdminDeleteIdentityDocument = gql`
  mutation adminDeleteIdentity($identityId: String!) {
    deleted: adminDeleteIdentity(identityId: $identityId)
  }
`
export const AdminGetInviteDocument = gql`
  query adminGetInvite($inviteId: String!) {
    item: adminGetInvite(inviteId: $inviteId) {
      ...InviteDetails
      users {
        ...UserDetails
      }
    }
  }
  ${InviteDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const AdminFindInvitesDocument = gql`
  query adminFindInvites($input: AdminFindInvitesInput!) {
    count: adminFindInvitesCount(input: $input) {
      ...PagingDetails
    }
    items: adminFindInvites(input: $input) {
      ...InviteDetails
    }
  }
  ${PagingDetailsFragmentDoc}
  ${InviteDetailsFragmentDoc}
`
export const AdminCreateInviteDocument = gql`
  mutation adminCreateInvite($input: AdminCreateInviteInput!) {
    item: adminCreateInvite(input: $input) {
      ...InviteDetails
    }
  }
  ${InviteDetailsFragmentDoc}
`
export const AdminUpdateInviteDocument = gql`
  mutation adminUpdateInvite($inviteId: String!, $input: AdminUpdateInviteInput!) {
    item: adminUpdateInvite(inviteId: $inviteId, input: $input) {
      ...InviteDetails
    }
  }
  ${InviteDetailsFragmentDoc}
`
export const AdminDeleteInviteDocument = gql`
  mutation adminDeleteInvite($inviteId: String!) {
    item: adminDeleteInvite(inviteId: $inviteId) {
      ...InviteDetails
    }
  }
  ${InviteDetailsFragmentDoc}
`
export const AnonGetInviteDocument = gql`
  query anonGetInvite($code: String!) {
    item: anonGetInvite(code: $code) {
      ...InviteDetails
      users {
        ...UserDetails
      }
    }
  }
  ${InviteDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const UserGetInvitesDocument = gql`
  query userGetInvites {
    items: userGetInvites {
      ...InviteDetails
    }
  }
  ${InviteDetailsFragmentDoc}
`
export const UserGetInviteDocument = gql`
  query userGetInvite {
    item: userGetInvite {
      ...InviteDetails
      users {
        ...UserDetails
      }
    }
  }
  ${InviteDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const UserAcceptInviteDocument = gql`
  mutation userAcceptInvite($code: String!) {
    item: userAcceptInvite(code: $code) {
      ...InviteDetails
    }
  }
  ${InviteDetailsFragmentDoc}
`
export const AdminFindNotificationsDocument = gql`
  query adminFindNotifications($input: AdminFindNotificationsInput!) {
    count: adminFindNotificationsCount(input: $input) {
      ...PagingDetails
    }
    items: adminFindNotifications(input: $input) {
      ...NotificationDetails
    }
  }
  ${PagingDetailsFragmentDoc}
  ${NotificationDetailsFragmentDoc}
`
export const AdminDeleteNotificationDocument = gql`
  mutation adminDeleteNotification($notificationId: String!) {
    deleted: adminDeleteNotification(notificationId: $notificationId)
  }
`
export const UserFindNotificationsDocument = gql`
  query userFindNotifications($input: UserFindNotificationsInput!) {
    count: userFindNotificationsCount(input: $input) {
      ...PagingDetails
    }
    items: userFindNotifications(input: $input) {
      ...NotificationDetails
    }
  }
  ${PagingDetailsFragmentDoc}
  ${NotificationDetailsFragmentDoc}
`
export const UserDeleteNotificationDocument = gql`
  mutation userDeleteNotification($notificationId: String!) {
    deleted: userDeleteNotification(notificationId: $notificationId)
  }
`
export const UserPokeDocument = gql`
  mutation userPoke($pokeId: String!) {
    poked: userPoke(pokeId: $pokeId)
  }
`
export const UserReadNotificationDocument = gql`
  mutation userReadNotification($notificationId: String!) {
    read: userReadNotification(notificationId: $notificationId)
  }
`
export const UserReadAllNotificationsDocument = gql`
  mutation userReadAllNotifications {
    read: userReadAllNotifications
  }
`
export const AdminFindUsersDocument = gql`
  query adminFindUsers($input: AdminFindUsersInput!) {
    count: adminFindUsersCount(input: $input) {
      ...PagingDetails
    }
    items: adminFindUsers(input: $input) {
      ...UserDetails
    }
  }
  ${PagingDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const AdminGetUserDocument = gql`
  query adminGetUser($userId: String!) {
    item: adminGetUser(userId: $userId) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminCreateUserDocument = gql`
  mutation adminCreateUser($input: AdminCreateUserInput!) {
    created: adminCreateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminUpdateUserDocument = gql`
  mutation adminUpdateUser($userId: String!, $input: AdminUpdateUserInput!) {
    updated: adminUpdateUser(userId: $userId, input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const AdminDeleteUserDocument = gql`
  mutation adminDeleteUser($userId: String!) {
    deleted: adminDeleteUser(userId: $userId)
  }
`
export const UserFindUsersDocument = gql`
  query userFindUsers($input: UserFindUsersInput!) {
    count: userFindUsersCount(input: $input) {
      ...PagingDetails
    }
    items: userFindUsers(input: $input) {
      ...UserDetails
    }
  }
  ${PagingDetailsFragmentDoc}
  ${UserDetailsFragmentDoc}
`
export const UserGetUserByUsernameDocument = gql`
  query userGetUserByUsername($username: String!) {
    item: userGetUserByUsername(username: $username) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`
export const UserUpdateUserDocument = gql`
  mutation userUpdateUser($input: UserUpdateUserInput!) {
    updated: userUpdateUser(input: $input) {
      ...UserDetails
    }
  }
  ${UserDetailsFragmentDoc}
`

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action()
const LoginDocumentString = print(LoginDocument)
const LogoutDocumentString = print(LogoutDocument)
const RegisterDocumentString = print(RegisterDocument)
const MeDocumentString = print(MeDocument)
const UptimeDocumentString = print(UptimeDocument)
const AdminFindEmailsDocumentString = print(AdminFindEmailsDocument)
const AdminCreateEmailDocumentString = print(AdminCreateEmailDocument)
const AdminUpdateEmailDocumentString = print(AdminUpdateEmailDocument)
const AdminDeleteEmailDocumentString = print(AdminDeleteEmailDocument)
const AdminFindIdentitiesDocumentString = print(AdminFindIdentitiesDocument)
const AdminCreateIdentityDocumentString = print(AdminCreateIdentityDocument)
const AdminDeleteIdentityDocumentString = print(AdminDeleteIdentityDocument)
const AdminGetInviteDocumentString = print(AdminGetInviteDocument)
const AdminFindInvitesDocumentString = print(AdminFindInvitesDocument)
const AdminCreateInviteDocumentString = print(AdminCreateInviteDocument)
const AdminUpdateInviteDocumentString = print(AdminUpdateInviteDocument)
const AdminDeleteInviteDocumentString = print(AdminDeleteInviteDocument)
const AnonGetInviteDocumentString = print(AnonGetInviteDocument)
const UserGetInvitesDocumentString = print(UserGetInvitesDocument)
const UserGetInviteDocumentString = print(UserGetInviteDocument)
const UserAcceptInviteDocumentString = print(UserAcceptInviteDocument)
const AdminFindNotificationsDocumentString = print(AdminFindNotificationsDocument)
const AdminDeleteNotificationDocumentString = print(AdminDeleteNotificationDocument)
const UserFindNotificationsDocumentString = print(UserFindNotificationsDocument)
const UserDeleteNotificationDocumentString = print(UserDeleteNotificationDocument)
const UserPokeDocumentString = print(UserPokeDocument)
const UserReadNotificationDocumentString = print(UserReadNotificationDocument)
const UserReadAllNotificationsDocumentString = print(UserReadAllNotificationsDocument)
const AdminFindUsersDocumentString = print(AdminFindUsersDocument)
const AdminGetUserDocumentString = print(AdminGetUserDocument)
const AdminCreateUserDocumentString = print(AdminCreateUserDocument)
const AdminUpdateUserDocumentString = print(AdminUpdateUserDocument)
const AdminDeleteUserDocumentString = print(AdminDeleteUserDocument)
const UserFindUsersDocumentString = print(UserFindUsersDocument)
const UserGetUserByUsernameDocumentString = print(UserGetUserByUsernameDocument)
const UserUpdateUserDocumentString = print(UserUpdateUserDocument)
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    login(
      variables: LoginMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: LoginMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LoginMutation>(LoginDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'login',
        'mutation',
      )
    },
    logout(
      variables?: LogoutMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: LogoutMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<LogoutMutation>(LogoutDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'logout',
        'mutation',
      )
    },
    register(
      variables: RegisterMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: RegisterMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<RegisterMutation>(RegisterDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'register',
        'mutation',
      )
    },
    me(
      variables?: MeQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: MeQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<MeQuery>(MeDocumentString, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        'me',
        'query',
      )
    },
    uptime(
      variables?: UptimeQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UptimeQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UptimeQuery>(UptimeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'uptime',
        'query',
      )
    },
    adminFindEmails(
      variables: AdminFindEmailsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindEmailsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindEmailsQuery>(AdminFindEmailsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindEmails',
        'query',
      )
    },
    adminCreateEmail(
      variables: AdminCreateEmailMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminCreateEmailMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateEmailMutation>(AdminCreateEmailDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateEmail',
        'mutation',
      )
    },
    adminUpdateEmail(
      variables: AdminUpdateEmailMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminUpdateEmailMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateEmailMutation>(AdminUpdateEmailDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateEmail',
        'mutation',
      )
    },
    adminDeleteEmail(
      variables: AdminDeleteEmailMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDeleteEmailMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteEmailMutation>(AdminDeleteEmailDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteEmail',
        'mutation',
      )
    },
    adminFindIdentities(
      variables: AdminFindIdentitiesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindIdentitiesQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindIdentitiesQuery>(AdminFindIdentitiesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindIdentities',
        'query',
      )
    },
    adminCreateIdentity(
      variables: AdminCreateIdentityMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminCreateIdentityMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateIdentityMutation>(AdminCreateIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateIdentity',
        'mutation',
      )
    },
    adminDeleteIdentity(
      variables: AdminDeleteIdentityMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDeleteIdentityMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteIdentityMutation>(AdminDeleteIdentityDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteIdentity',
        'mutation',
      )
    },
    adminGetInvite(
      variables: AdminGetInviteQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminGetInviteQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetInviteQuery>(AdminGetInviteDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetInvite',
        'query',
      )
    },
    adminFindInvites(
      variables: AdminFindInvitesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindInvitesQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindInvitesQuery>(AdminFindInvitesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindInvites',
        'query',
      )
    },
    adminCreateInvite(
      variables: AdminCreateInviteMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminCreateInviteMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateInviteMutation>(AdminCreateInviteDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateInvite',
        'mutation',
      )
    },
    adminUpdateInvite(
      variables: AdminUpdateInviteMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminUpdateInviteMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateInviteMutation>(AdminUpdateInviteDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateInvite',
        'mutation',
      )
    },
    adminDeleteInvite(
      variables: AdminDeleteInviteMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDeleteInviteMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteInviteMutation>(AdminDeleteInviteDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteInvite',
        'mutation',
      )
    },
    anonGetInvite(
      variables: AnonGetInviteQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AnonGetInviteQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AnonGetInviteQuery>(AnonGetInviteDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'anonGetInvite',
        'query',
      )
    },
    userGetInvites(
      variables?: UserGetInvitesQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserGetInvitesQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetInvitesQuery>(UserGetInvitesDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetInvites',
        'query',
      )
    },
    userGetInvite(
      variables?: UserGetInviteQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserGetInviteQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetInviteQuery>(UserGetInviteDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetInvite',
        'query',
      )
    },
    userAcceptInvite(
      variables: UserAcceptInviteMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserAcceptInviteMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserAcceptInviteMutation>(UserAcceptInviteDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userAcceptInvite',
        'mutation',
      )
    },
    adminFindNotifications(
      variables: AdminFindNotificationsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindNotificationsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindNotificationsQuery>(AdminFindNotificationsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindNotifications',
        'query',
      )
    },
    adminDeleteNotification(
      variables: AdminDeleteNotificationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDeleteNotificationMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteNotificationMutation>(AdminDeleteNotificationDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteNotification',
        'mutation',
      )
    },
    userFindNotifications(
      variables: UserFindNotificationsQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserFindNotificationsQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindNotificationsQuery>(UserFindNotificationsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindNotifications',
        'query',
      )
    },
    userDeleteNotification(
      variables: UserDeleteNotificationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserDeleteNotificationMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserDeleteNotificationMutation>(UserDeleteNotificationDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userDeleteNotification',
        'mutation',
      )
    },
    userPoke(
      variables: UserPokeMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserPokeMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserPokeMutation>(UserPokeDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userPoke',
        'mutation',
      )
    },
    userReadNotification(
      variables: UserReadNotificationMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserReadNotificationMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserReadNotificationMutation>(UserReadNotificationDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userReadNotification',
        'mutation',
      )
    },
    userReadAllNotifications(
      variables?: UserReadAllNotificationsMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserReadAllNotificationsMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserReadAllNotificationsMutation>(UserReadAllNotificationsDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userReadAllNotifications',
        'mutation',
      )
    },
    adminFindUsers(
      variables: AdminFindUsersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminFindUsersQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminFindUsersQuery>(AdminFindUsersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminFindUsers',
        'query',
      )
    },
    adminGetUser(
      variables: AdminGetUserQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminGetUserQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminGetUserQuery>(AdminGetUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminGetUser',
        'query',
      )
    },
    adminCreateUser(
      variables: AdminCreateUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminCreateUserMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminCreateUserMutation>(AdminCreateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminCreateUser',
        'mutation',
      )
    },
    adminUpdateUser(
      variables: AdminUpdateUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminUpdateUserMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminUpdateUserMutation>(AdminUpdateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminUpdateUser',
        'mutation',
      )
    },
    adminDeleteUser(
      variables: AdminDeleteUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: AdminDeleteUserMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<AdminDeleteUserMutation>(AdminDeleteUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'adminDeleteUser',
        'mutation',
      )
    },
    userFindUsers(
      variables: UserFindUsersQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserFindUsersQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserFindUsersQuery>(UserFindUsersDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userFindUsers',
        'query',
      )
    },
    userGetUserByUsername(
      variables: UserGetUserByUsernameQueryVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserGetUserByUsernameQuery; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserGetUserByUsernameQuery>(UserGetUserByUsernameDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userGetUserByUsername',
        'query',
      )
    },
    userUpdateUser(
      variables: UserUpdateUserMutationVariables,
      requestHeaders?: Dom.RequestInit['headers'],
    ): Promise<{ data: UserUpdateUserMutation; extensions?: any; headers: Dom.Headers; status: number }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<UserUpdateUserMutation>(UserUpdateUserDocumentString, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders,
          }),
        'userUpdateUser',
        'mutation',
      )
    },
  }
}
export type Sdk = ReturnType<typeof getSdk>
