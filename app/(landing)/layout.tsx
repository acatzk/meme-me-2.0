'use client'

import { useUser } from '@clerk/nextjs'
import { useMediaQuery } from 'usehooks-ts'
import React, { FC, ReactNode } from 'react'

import { LogoWitTitle } from '~/components/custom-icon/logo-with-title'

import { CarouselSlider } from './_components/carousel-slider'

type Props = {
  children: ReactNode
}

const LandingLayout: FC<Props> = ({ children }): JSX.Element => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { isSignedIn } = useUser()
  const isAuthenticated = isSignedIn !== undefined && isSignedIn

  return (
    <main className="flex h-screen min-h-screen overflow-hidden">
      {!isMobile && (
        <section className="flex h-full flex-1 items-center justify-center bg-core-hover">
          <div className="w-full max-w-md select-none space-y-6">
            <CarouselSlider />
            <div className="space-y-1.5 text-center">
              <h1 className="text-xl font-semibold text-white">Connect with every application</h1>
              <p className="text-xs text-core-100">
                be part of the community where laughter should be sharable
              </p>
            </div>
          </div>
        </section>
      )}
      <section className="w-full overflow-auto md:w-[50%]">
        <div className="flex h-full flex-col items-start justify-center px-8">
          <div className="mx-auto inline-flex w-full max-w-md flex-col space-y-10">
            {/* Information */}
            <div className="space-y-6">
              <LogoWitTitle className="-mx-9 -my-4 w-52" />
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-secondary-foreground">
                  {isAuthenticated ? 'Go to the Home Page' : 'Log in to your Account'}
                </h2>
                <p className="text-sm font-medium text-secondary-200">Welcome back!</p>
              </div>
            </div>

            {/* Form */}
            <div>{children}</div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default LandingLayout
