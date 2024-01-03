'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, LogIn } from 'lucide-react'
import { SignInButton, useUser } from '@clerk/clerk-react'

import { Button } from '~/components/ui/button'

export default function LandingPage(): JSX.Element | null {
  const router = useRouter()
  const { isSignedIn } = useUser()
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
