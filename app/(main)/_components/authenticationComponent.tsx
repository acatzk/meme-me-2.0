'use client'

import React from 'react'
import { UserProfile, useAuth, UserButton } from '@clerk/nextjs'

import { trpc } from '~/app/_trpc/client'

export const AuthenComponents = (): JSX.Element => {
  const { isSignedIn } = useAuth()
  const isAuthenticated = isSignedIn !== undefined && isSignedIn
  const hello = trpc.example.hello.useQuery()

  return (
    <>
      {isAuthenticated ? (
        <>
          <pre>{JSON.stringify(hello.data, null, 2)}</pre>
          <UserButton />
          <UserProfile />
        </>
      ) : (
        <div>You are not authenticated</div>
      )}
    </>
  )
}
