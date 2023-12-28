'use client'

import React from 'react'
import { UserProfile, UserButton } from '@clerk/nextjs'

import { trpc } from '~/app/_trpc/client'

export const AuthenComponents = (): JSX.Element => {
  const { data: getCurrentUser, isLoading } = trpc.example.getAllUser.useQuery()

  return (
    <>
      {isLoading ? <p>Loading data</p> : <pre>{JSON.stringify(getCurrentUser, null, 2)}</pre>}
      <UserButton afterSignOutUrl="/" />
      <UserProfile />
    </>
  )
}
