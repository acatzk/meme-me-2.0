'use client'

import Image from 'next/image'
import React, { ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ArrowLeft, FileWarningIcon, Settings } from 'lucide-react'

import { trpc } from '~/trpc/client'
import { Button } from '~/components/ui/button'
import { Tab } from '~/app/(main)/_components/tab'
import { Skeleton } from '~/components/ui/skeleton'
import { profileTabs } from '~/constant/profile-tabs'
import { Alert, AlertDescription, AlertTitle } from '~/components/ui/alert'
import { extractUsernameFromPath } from '~/helpers/extract-username-from-path'

export type ProfileLayoutProps = {
  children: ReactNode
}

export default function ProfileLayout({ children }: ProfileLayoutProps): JSX.Element {
  const router = useRouter()
  const pathname = usePathname()
  const username = extractUsernameFromPath(pathname)

  const user = trpc.user.getUserByUsername.useQuery({
    username
  })

  const handleGoBackRoute = (): void => {
    router.back()
  }

  if (user.isLoading) {
    return <ProfileLayout.Skeleton>{children}</ProfileLayout.Skeleton>
  }

  if (user.isError) {
    return (
      <div className="px-6 py-6">
        <Alert variant="destructive">
          <FileWarningIcon className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{user?.error?.message ?? 'Something went wrong!'}</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <header className="flex items-center space-x-2 border-b border-stroke-3 px-4 py-2 text-core-secondary">
        <button
          type="button"
          onClick={handleGoBackRoute}
          className="rounded-full px-1 py-1.5 outline-primary"
        >
          <ArrowLeft className="stroke-4 h-5 w-5" />
        </button>
        <h1 className="text-sm font-bold uppercase">{user?.data?.displayName}</h1>
      </header>
      <article className="">
        <section className="mx-auto w-full max-w-3xl px-4 py-6 text-core-secondary md:px-8">
          <div className="flex flex-col items-start gap-x-6 gap-y-4 md:flex-row md:gap-x-12">
            <Image
              src={
                user?.data?.imageUrl ??
                'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'
              }
              width={144}
              height={144}
              className="rounded-full border-[3px] border-white shadow outline-4"
              alt="User Profile"
            />
            <div className="flex flex-col space-y-3 text-sm">
              <div className="flex items-center space-x-6">
                <h2 className="line-clamp-1 text-base font-semibold">{user?.data?.username}</h2>
                <Button
                  type="button"
                  variant="secondary-outline"
                  className="px-2 py-1 text-sm font-bold text-core-secondary"
                >
                  Edit Profile
                </Button>
                <button type="button">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
              <div className="flex items-center space-x-4">
                <a href="#" className="inline-flex items-center space-x-1 hover:underline">
                  <h4 className="font-bold">0</h4>
                  <span>posts</span>
                </a>
                <a href="#" className="inline-flex items-center space-x-1 hover:underline">
                  <h4 className="font-bold">0</h4>
                  <span>followers</span>
                </a>
                <a href="#" className="inline-flex items-center space-x-1 hover:underline">
                  <h4 className="font-bold">0</h4>
                  <span>following</span>
                </a>
              </div>
              <div className="flex flex-col space-y-0.5">
                <h1 className="font-bold uppercase">{user?.data?.displayName}</h1>
                {/* <p className="text-core-secondary-300">I think therefore I am</p>
                <a href="#" className="font-semibold text-primary hover:underline">
                  joshuagalit.ga
                </a> */}
              </div>
            </div>
          </div>
        </section>
        <hr />
        <section className="mx-auto w-full max-w-3xl">
          <nav>
            <ul className="flex items-center justify-evenly gap-x-4 sm:ml-[184px] sm:justify-normal md:ml-56 md:gap-x-8">
              {profileTabs.map(({ title, href, Icon }, index) => {
                const newHref = `/@${user?.data?.username}${href}`
                const isActive = pathname === newHref

                return (
                  <Tab
                    key={index}
                    {...{
                      title,
                      href: newHref,
                      isActive,
                      TabIcon: Icon
                    }}
                  />
                )
              })}
            </ul>
          </nav>
          {children}
        </section>
      </article>
    </div>
  )
}

ProfileLayout.Skeleton = function ProfileSkeleton({ children }: { children: React.ReactNode }) {
  return (
    <div role="status" className="w-full animate-pulse">
      <header className="flex items-center space-x-2 px-4 py-3">
        <Skeleton className="h-2 w-48" />
      </header>
      <hr />
      <div className="mx-auto mt-4 flex w-full max-w-3xl flex-col items-center gap-y-4 space-x-3 px-4 py-8 md:flex-row md:px-8">
        <svg
          className="h-28 w-28 text-core-secondary-100/30"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
        </svg>
        <div>
          <Skeleton className="h-2.5 w-48" />
          <Skeleton className="h-2 w-48" />
        </div>
      </div>
      <hr />
      <div className="mx-auto w-full max-w-3xl">
        <div className="flex items-center justify-evenly gap-x-4 py-3 sm:ml-[184px] sm:justify-normal md:ml-40 md:gap-x-8">
          <Skeleton className="h-2 w-12" />
          <Skeleton className="h-2 w-12" />
          <Skeleton className="h-2 w-12" />
        </div>
      </div>
      {children}
    </div>
  )
}
