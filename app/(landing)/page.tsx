'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, LogIn } from 'lucide-react'
import { SignInButton, useAuth } from '@clerk/clerk-react'

import { Button } from '~/components/ui/button'

const LandingPage = (): JSX.Element => {
  const router = useRouter()
  const { isSignedIn } = useAuth()
  const isSignedInUser = isSignedIn !== undefined && isSignedIn

  return (
    <div className="w-full">
      {!isSignedInUser && (
        <SignInButton mode="modal">
          <Button variant="primary" className="relative w-full">
            <LogIn className="absolute left-4 mr-2 h-4 w-4" />
            Login
          </Button>
        </SignInButton>
      )}
      {isSignedInUser && (
        <Button
          onClick={() => router.push('/home')}
          variant="primary-outline"
          className="relative w-full"
        >
          <ArrowRight className="absolute left-4 mr-2 h-4 w-4" />
          Enter Meme me
        </Button>
      )}
    </div>
  )
}

export default LandingPage
