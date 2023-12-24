'use client'

import React from 'react'
import { UserProfile, useAuth, UserButton, SignInButton } from '@clerk/nextjs'

export const AuthenComponents = (): JSX.Element => {
  const { isSignedIn } = useAuth()
  const isAuthenticated = isSignedIn !== undefined && isSignedIn

  return (
    <>
      {isAuthenticated ? (
        <>
          <UserProfile />
          <UserButton />
        </>
      ) : (
        <SignInButton />
      )}
    </>
  )
}
